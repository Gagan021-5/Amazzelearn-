import { useEffect, useState } from "react";

function createBuckets(bucketIds) {
  return bucketIds.reduce((accumulator, bucketId) => {
    accumulator[bucketId] = [];
    return accumulator;
  }, {});
}

export function useBucketSortGame(bucketIds, sessionId) {
  const bucketKey = bucketIds.join("|");
  const [buckets, setBuckets] = useState(() => createBuckets(bucketIds));
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [draggedItemId, setDraggedItemId] = useState(null);

  useEffect(() => {
    setBuckets(createBuckets(bucketIds));
    setSelectedItemId(null);
    setDraggedItemId(null);
  }, [sessionId, bucketKey]);

  const moveItemToBucket = (bucketId, itemId) => {
    if (!itemId) {
      return;
    }

    setBuckets((current) => {
      const next = {};

      bucketIds.forEach((id) => {
        next[id] = current[id].filter((value) => value !== itemId);
      });

      next[bucketId] = [...next[bucketId], itemId];
      return next;
    });

    setSelectedItemId(null);
    setDraggedItemId(null);
  };

  const handleBucketDrop = (bucketId) => {
    const itemId = draggedItemId ?? selectedItemId;

    if (itemId) {
      moveItemToBucket(bucketId, itemId);
    }
  };

  const removeItem = (itemId) => {
    setBuckets((current) => {
      const next = {};

      bucketIds.forEach((id) => {
        next[id] = current[id].filter((value) => value !== itemId);
      });

      return next;
    });
  };

  const findBucketForItem = (itemId) =>
    bucketIds.find((bucketId) => buckets[bucketId].includes(itemId)) ?? null;

  const isPlaced = (itemId) => Boolean(findBucketForItem(itemId));

  return {
    buckets,
    selectedItemId,
    draggedItemId,
    setSelectedItemId,
    setDraggedItemId,
    moveItemToBucket,
    handleBucketDrop,
    removeItem,
    findBucketForItem,
    isPlaced,
  };
}
