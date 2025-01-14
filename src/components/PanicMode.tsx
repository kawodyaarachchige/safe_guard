import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlertOctagon, Video } from 'lucide-react';
import { togglePanicMode, setRecording } from '../store/slices/emergencySlice';
import type { RootState } from '../store/store';

const PanicMode = () => {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const {active, recording} = useSelector((state: RootState) => state.emergency.panicMode);

  useEffect(() => {
    if (active && !recording) {
      startRecording();
    } else if (!active && recording) {
      stopRecording();
    }
  }, [active]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {type: 'video/webm'});
        const url = URL.createObjectURL(blob);

        // Create a download link for the recording
        const a = document.createElement('a');
        a.href = url;
        a.download = `panic-recording-${new Date().toISOString()}.webm`;
        a.click();

        // Clean up
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      mediaRecorder.start();
      dispatch(setRecording(true));
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please check camera permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      dispatch(setRecording(false));
    }
  };

  const handlePanicToggle = () => {
    dispatch(togglePanicMode(!active));
  };

// Panic Button Component
  return (
      <div className={`fixed bottom-24 right-8 flex flex-col items-end space-y-4`}>
        {active && (
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-64 h-48 rounded-lg"
              />
              <div className="mt-2 flex items-center justify-center">
                <Video className="h-5 w-5 text-red-600 animate-pulse"/>
                <span className="ml-2 text-red-600">Recording...</span>
              </div>
            </div>
        )}
        <button
            onClick={handlePanicToggle}
            className={`p-4 rounded-full shadow-lg flex items-center space-x-2 transition-colors ${
                active
                    ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                    : 'bg-yellow-500 hover:bg-yellow-600'
            }`}
        >
          <AlertOctagon className="h-6 w-6 text-white"/>
          <span className="text-white font-bold">
        {active ? 'Stop Panic Mode' : 'Activate Panic Mode'}
      </span>
        </button>
      </div>
  );
}

export default PanicMode;
