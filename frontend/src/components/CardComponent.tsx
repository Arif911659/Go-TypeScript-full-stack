// CardComponent.tsx
import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface CardComponentProps {
  card: User;
}

const CardComponent: React.FC<CardComponentProps> = ({ card }) => {
  if (!card) return null;
  
  return (
    <div className="flex flex-col p-4 bg-white shadow rounded">
      <p>Id: {card.id || 'N/A'}</p>
      <p>Name: {card.name || 'N/A'}</p>
      <p>Email: {card.email || 'N/A'}</p>
    </div>
  );
};

export default CardComponent;

// import React from 'react';

// interface Card {
//   id: number;
//   name: string;
//   email: string;
// }

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
//     }
//   }
// }

// const CardComponent: React.FC<{ card: Card }> = ({ card }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-lg p-2 mb-2 hover:bg-gray-100">
//       <div className="text-sm text-gray-600">Id: {card.id}</div>
//       <div className="text-lg font-semibold text-gray-800">{card.name}</div>
//       <div className="text-md text-gray-700">{card.email}</div>
//     </div>
//   );
// }

// export default CardComponent;
