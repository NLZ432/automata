import React, { useState, useRef, useEffect } from 'react';
import './Draggable.css';

interface DraggableProps {
  children: React.ReactNode;
}

const Draggable: React.FC<DraggableProps> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate center position
    const centerX = (window.innerWidth - (elementRef.current?.offsetWidth || 0)) / 2;
    const centerY = (window.innerHeight - (elementRef.current?.offsetHeight || 0)) / 2;
    setPosition({ x: centerX, y: centerY });
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow dragging from the top area
    const target = e.target as HTMLElement;
    if (!target.closest('.draggable-header')) {
      return;
    }
    
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      setPosition({
        x: newX,
        y: newY
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={elementRef}
      className={`draggable ${isDragging ? 'dragging' : ''}`}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(0, 0)'
      }}
    >
      <div 
        className="draggable-header"
        onMouseDown={handleMouseDown}
        style={{
          cursor: 'grab',
          height: '20px',
          userSelect: 'none'
        }}
      />
      <div className="draggable-content">
        {children}
      </div>
    </div>
  );
};

export default Draggable; 