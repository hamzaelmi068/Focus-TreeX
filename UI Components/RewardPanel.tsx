import React from 'react';
import { useStore } from '../utils/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function RewardPanel() {
  const { timer, treeStyles, selectedTreeStyle, selectTreeStyle, unlockTreeStyle } = useStore();

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">Total Focus Time</span>
        <Badge variant="secondary">{timer.totalFocusMinutes} minutes</Badge>
      </div>
      
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium">Tree Styles</span>
        {treeStyles.map((style) => (
          <Button
            key={style.id}
            variant={selectedTreeStyle === style.id ? "default" : "outline"}
            className="justify-between"
            onClick={() => style.unlocked && selectTreeStyle(style.id)}
            disabled={!style.unlocked}
          >
            <span>{style.name}</span>
            {!style.unlocked && (
              <Badge variant="secondary">
                Unlock: {style.unlockCost}m
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {treeStyles.map((style) => {
        if (!style.unlocked && timer.totalFocusMinutes >= style.unlockCost) {
          return (
            <Button
              key={`unlock-${style.id}`}
              onClick={() => unlockTreeStyle(style.id)}
              variant="secondary"
            >
              Unlock {style.name}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
}