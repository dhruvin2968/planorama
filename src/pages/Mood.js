import React, { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Unicode icons for emoji compatibility
const stickers = [
  { id: 1, icon: "\u{1F3D4}", label: "Mountain" },
  { id: 2, icon: "\u{1F306}", label: "City" },
  { id: 3, icon: "\u{1F30A}", label: "Ocean" },
  { id: 4, icon: "\u{1F3A1}", label: "Theme Park" },
  { id: 5, icon: "\u{1F35C}", label: "Food" },
  { id: 6, icon: "\u{1F303}", label: "Nightlife" },
];

// Draggable Sticker Palette Item
function Sticker({ sticker }) {
  const [, drag] = useDrag({
    type: "sticker",
    item: sticker,
  });
  return (
    <div
      ref={drag}
      className="flex flex-col items-center justify-center p-4 w-20 h-24 bg-white rounded-xl shadow-md cursor-grab hover:scale-110 hover:bg-blue-50 transition-transform duration-200 border border-blue-100"
    >
      <span className="text-4xl">{sticker.icon}</span>
      <span className="text-xs text-blue-700 font-semibold mt-2">
        {sticker.label}
      </span>
    </div>
  );
}

// Sticker placed on the timeline
function PlacedSticker({ sticker, left, time, onRemove }) {
  return (
    <div
      style={{ left: `${left}%` }}
      className="absolute top-6 z-20 transform -translate-x-1/2 cursor-pointer text-center group"
      onClick={onRemove}
      title="Click to remove"
    >
      <div className="flex flex-col items-center">
        <span className="text-3xl group-hover:scale-125 transition-transform">
          {sticker.icon}
        </span>
        <span className="text-[11px] text-blue-700 font-medium">
          {sticker.label}
        </span>
        <span className="text-[10px] text-cyan-500 font-semibold">
          {time}:00
        </span>
        <span className="text-[9px] text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Remove
        </span>
      </div>
    </div>
  );
}
export const Moodboard = () => {
  const [placed, setPlaced] = useState([]);
  const boardRef = useRef(null);

  const [, drop] = useDrop({
    accept: "sticker",
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const boardRect = boardRef.current.getBoundingClientRect();
      const left = ((clientOffset.x - boardRect.left) / boardRect.width) * 100;
      const time = Math.max(0, Math.min(24, Math.floor((left / 100) * 24)));
      setPlaced((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), sticker: item, left, time },
      ]);
    },
  });

  const removeSticker = (id) =>
    setPlaced((prev) => prev.filter((s) => s.id !== id));

  return (
    <div className="max-w-screen-2xl h-screen mx-auto mt-10 p-8 bg-Bluee rounded-3xl shadow-2xl border border-blue-100">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-3 text-center tracking-tight drop-shadow">
        <span role="img" aria-label="calendar" className="mr-2">
          📅
        </span>
        Visual Trip Moodboard
      </h2>
      <p className="text-center text-blue-500 mb-8 text-base">
        Drag a sticker onto the timeline below. <br /> Click a sticker to remove
        it.
      </p>

      {/* Sticker Palette */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {stickers.map((sticker) => (
          <Sticker key={sticker.id} sticker={sticker} />
        ))}
      </div>

      {/* Timeline */}
      <div
        ref={boardRef}
        className="relative h-28 bg-white border-2 border-blue-200 rounded-2xl mx-auto overflow-visible shadow-lg"
      >
        {/* Timeline bar */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full -translate-y-1/2 shadow" />
        <div ref={drop} className="absolute inset-0 z-10" />

        {/* Hour markers */}
        {[...Array(13)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[11px] text-blue-600 font-semibold"
            style={{
              left: `${(i / 12) * 100}%`,
              top: "75%",
              transform: "translateX(-50%)",
              zIndex: 0,
              opacity: i % 2 === 0 ? 1 : 0.45,
            }}
          >
            {i * 2}:00
          </div>
        ))}

        {/* Placed Stickers */}
        {placed.map((s) => (
          <PlacedSticker
            key={s.id}
            sticker={s.sticker}
            left={s.left}
            time={s.time}
            onRemove={() => removeSticker(s.id)}
          />
        ))}
      </div>
    </div>
  );
};

export const Mood = () => (
  <DndProvider backend={HTML5Backend}>
    <Moodboard />
  </DndProvider>
);
