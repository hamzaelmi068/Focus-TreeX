import React from 'react';
import { useStore } from '../UI Files/store';

export function Tree() {
  const { treeGrowth, selectedTreeStyle, treeStyles } = useStore();
  const currentStyle = treeStyles.find(style => style.id === selectedTreeStyle);

  const getTreeColor = () => {
    switch(currentStyle?.color) {
      case 'red': return 'rgb(220, 38, 38)';
      case 'pink': return 'rgb(236, 72, 153)';
      default: return 'rgb(16, 185, 129)';
    }
  };

  return (
    <div className="relative w-64 h-64 overflow-visible">
      {/* Branches */}
      <div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-in-out"
        style={{
          width: `${Math.max(40, treeGrowth * 1.2)}px`,
          height: '2px',
          backgroundColor: getTreeColor(),
          opacity: treeGrowth > 30 ? Math.max(0.4, treeGrowth / 100) : 0,
          transform: `rotate(-25deg) scaleX(${1 + (treeGrowth * 0.005)})`,
          transformOrigin: 'left center',
        }}
      />
      <div 
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-in-out"
        style={{
          width: `${Math.max(30, treeGrowth * 0.8)}px`,
          height: '2px',
          backgroundColor: getTreeColor(),
          opacity: treeGrowth > 50 ? Math.max(0.4, treeGrowth / 100) : 0,
          transform: `rotate(35deg) scaleX(${1 + (treeGrowth * 0.004)})`,
          transformOrigin: 'left center',
        }}
      />
      {/* Tree trunk */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 rounded-md transition-all duration-1000 ease-in-out"
        style={{
          height: `${Math.max(30, treeGrowth * 0.6)}px`,
          transform: `scale(${1 + (treeGrowth * 0.002)})`,
          transformOrigin: 'bottom',
          backgroundColor: getTreeColor(),
        }}
      />
      {/* Tree crown layers */}
      <div
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-1000 ease-in-out shadow-lg"
        style={{
          width: `${Math.max(45, treeGrowth * 1.8)}px`,
          height: `${Math.max(45, treeGrowth * 1.8)}px`,
          transform: `scale(${1 + (treeGrowth * 0.003)}) translate(${treeGrowth * 0.2}px, ${treeGrowth * -0.3}px)`,
          transformOrigin: 'bottom center',
          backgroundColor: getTreeColor(),
          opacity: Math.max(0.3, treeGrowth / 100),
          filter: `blur(${Math.max(0, (100 - treeGrowth) * 0.03)}px)`,
        }}
      />
      <div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-1000 ease-in-out shadow-lg"
        style={{
          width: `${Math.max(40, treeGrowth * 1.6)}px`,
          height: `${Math.max(40, treeGrowth * 1.6)}px`,
          transform: `scale(${1 + (treeGrowth * 0.003)}) translate(${treeGrowth * -0.2}px, ${treeGrowth * -0.2}px)`,
          transformOrigin: 'bottom center',
          backgroundColor: getTreeColor(),
          opacity: Math.max(0.4, treeGrowth / 100),
          filter: `blur(${Math.max(0, (100 - treeGrowth) * 0.03)}px)`,
        }}
      />
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-1000 ease-in-out shadow-lg"
        style={{
          width: `${Math.max(55, treeGrowth * 2)}px`,
          height: `${Math.max(55, treeGrowth * 2)}px`,
          transform: `scale(${1 + (treeGrowth * 0.003)}) translateY(${treeGrowth * -0.3}px)`,
          transformOrigin: 'bottom center',
          backgroundColor: getTreeColor(),
          opacity: Math.max(0.4, treeGrowth / 100),
          filter: `blur(${Math.max(0, (100 - treeGrowth) * 0.05)}px)`,
        }}
      />
    </div>
  );
}