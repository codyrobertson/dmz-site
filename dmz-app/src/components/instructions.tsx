import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareSquare, faEllipsisV, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

interface InstructionsProps {
  device: string;
  browser: string;
}

const Instructions: React.FC<InstructionsProps> = ({ device, browser }) => {
  const instructionStyle = "text-white text-opacity-60 pb-6 pt-2 px-4";
  const iconStyle = "text-purple-600";

  const instructions: { [key: string]: { [key: string]: string[] } } = {
    iOS: {
      Safari: [
        "Tap the \"Share\" button at the bottom of the screen.",
        "Select \"Add to Home Screen\" from the options."
      ],
      Chrome: [
        "Tap the \"Share\" button at the top right of the screen.",
        "Select \"Add to Home Screen\" from the options."
      ]
    },
    Android: {
      Chrome: [
        "Tap the menu button (three dots) at the top right of the screen.",
        "Select \"Add to Home Screen\" from the options."
      ],
      Firefox: [
        "Tap the menu button (three dots) at the top right of the screen.",
        "Select \"Add to Home Screen\" from the options."
      ]
    }
  };

  const getIconForInstruction = (instructionIndex: number) => {
    switch (instructionIndex) {
      case 0:
        return faShareSquare; // Share button icon
      case 1:
        return faPlusSquare; // Add to Home Screen icon
      default:
        return faEllipsisV; // Default to ellipsis (menu) icon
    }
  };

  if (instructions[device] && instructions[device][browser]) {
    return (
      <div className={`text-center ${instructionStyle}`}>
        <p className="text-white text-opacity-50 pb-2 uppercase">Button not working? Try this:</p>
        <div className="flex flex-col space-y-4 items-center justify-center text-balance">
          {instructions[device][browser].map((instruction: string, index: number) => (
            <div key={index} className="flex flex-col items-center w-full max-w-xs md:max-w-md lg:max-w-lg">
              <FontAwesomeIcon icon={getIconForInstruction(index)} className={`mb-2 ${iconStyle}`} />
              <span className="inline-block text-center w-full">{instruction}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default Instructions;
