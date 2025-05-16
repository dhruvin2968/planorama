import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";

const initialPlans = [
  { id: "plan-1", day: "Day 1", notes: "Arrival and city tour" },
  { id: "plan-2", day: "Day 2", notes: "Visit the museum and park" },
  { id: "plan-3", day: "Day 3", notes: "Beach day and local market" },
  { id: "plan-4", day: "Day 4", notes: "Hiking trip to nearby hills" },
];

export const InteractiveItinerary = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [newDay, setNewDay] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedPlans = Array.from(plans);
    const [moved] = reorderedPlans.splice(result.source.index, 1);
    reorderedPlans.splice(result.destination.index, 0, moved);
    setPlans(reorderedPlans);
  };

  const handleAddPlan = () => {
    if (!newDay || !newNotes) return;
    
    const newPlan = {
      id: `plan-${Date.now()}`,
      day: newDay,
      notes: newNotes,
    };
    
    setPlans([...plans, newPlan]);
    setNewDay("");
    setNewNotes("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center">
        ✨ Travel Planner
      </h2>

      {/* Add New Day Form */}
      <div className="mb-8 p-6 bg-white rounded-xl shadow-md border border-purple-50">
        <h3 className="text-xl font-semibold text-indigo-700 mb-4">➕ Add New Day</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            placeholder="Day title (e.g., Day 5)"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            value={newNotes}
            onChange={(e) => setNewNotes(e.target.value)}
            placeholder="Activity description"
            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={handleAddPlan}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
        >
          Add to Itinerary
        </button>
      </div>

      {/* Drag & Drop Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="itinerary">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {plans.map((plan, index) => (
                <Draggable key={plan.id} draggableId={plan.id} index={index}>
                  {(provided, snapshot) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`group relative bg-white rounded-xl shadow-lg p-6 cursor-grab active:cursor-grabbing border-l-8 border-indigo-500 transition-all ${
                        snapshot.isDragging
                          ? "rotate-1 scale-[1.02] shadow-xl"
                          : "hover:shadow-xl"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-indigo-700">
                          {plan.day}
                        </h3>
                        <span className="text-xl text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          ⠿
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {plan.notes}
                      </p>
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
