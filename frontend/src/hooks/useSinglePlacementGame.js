import { useEffect, useState } from "react";

function createPlacements(zoneIds) {
  return zoneIds.reduce((accumulator, zoneId) => {
    accumulator[zoneId] = null;
    return accumulator;
  }, {});
}

export function useSinglePlacementGame(zoneIds, sessionId) {
  const zoneKey = zoneIds.join("|");
  const [placements, setPlacements] = useState(() => createPlacements(zoneIds));
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [draggedItemId, setDraggedItemId] = useState(null);

  useEffect(() => {
    setPlacements(createPlacements(zoneIds));
    setSelectedItemId(null);
    setDraggedItemId(null);
  }, [sessionId, zoneKey]);

  const placeItem = (zoneId, itemId) => {
    if (!itemId) {
      return;
    }

    setPlacements((current) => {
      const next = { ...current };

      Object.keys(next).forEach((key) => {
        if (next[key] === itemId) {
          next[key] = null;
        }
      });

      next[zoneId] = itemId;
      return next;
    });

    setSelectedItemId(null);
    setDraggedItemId(null);
  };

  const handleZoneDrop = (zoneId) => {
    const itemId = draggedItemId ?? selectedItemId;

    if (itemId) {
      placeItem(zoneId, itemId);
    }
  };

  const clearZone = (zoneId) => {
    setPlacements((current) => ({
      ...current,
      [zoneId]: null,
    }));
  };

  const isPlaced = (itemId) => Object.values(placements).includes(itemId);

  return {
    placements,
    selectedItemId,
    draggedItemId,
    setSelectedItemId,
    setDraggedItemId,
    placeItem,
    handleZoneDrop,
    clearZone,
    isPlaced,
  };
}
