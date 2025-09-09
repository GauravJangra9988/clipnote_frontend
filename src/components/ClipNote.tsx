import { useState, useEffect } from "react";
import { ClipboardSidebar } from "./ClipboardSidebar";
import { ClipboardContent } from "./ClipboardContent";
import {ContentType } from "@/types/clipboard";
import { useToast } from "@/hooks/use-toast";
import { ClipboardItem, ApiClipboardItem, mapApiToClipboardItem } from "@/types/clipboard";


const URL = import.meta.env.VITE_API_URL

export const ClipNote = () => {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ClipboardItem | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ContentType | undefined>();
  const { toast } = useToast();

  // Fetch from server on mount
useEffect(() => {
  const fetchClipboardItems = async () => {
    try {
      const res = await fetch(`${URL}/clips`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch clipboard items");

      const json = await res.json();
      const rawData: ApiClipboardItem[] = Array.isArray(json) ? json : [];
      const data: ClipboardItem[] = rawData.map(mapApiToClipboardItem);

      setItems(data);

      if (data.length === 0) {
        toast({
          title: "No clipboard history",
          description: "No clipboard items were found",
          variant: "destructive",
        });
      } else {
        setSelectedItem(data[data.length-1]);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load clipboard data from server",
        variant: "destructive",
      });
    }
  };

  fetchClipboardItems();
}, [toast]);


  const handleToggleFavorite = (id: string) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, isFavorite: !item.isFavorite }
        : item
    ));
    
    if (selectedItem?.id === id) {
      setSelectedItem({ ...selectedItem, isFavorite: !selectedItem.isFavorite });
    }

    toast({
      title: "Favorite updated",
      description: "Item has been updated in your favorites.",
    });
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    
    if (selectedItem?.id === id) {
      const remainingItems = items.filter(item => item.id !== id);
      setSelectedItem(remainingItems[0] || undefined);
    }

    toast({
      title: "Item deleted",
      description: "Clipboard item has been permanently removed.",
    });
  };

  const handleSelectItem = (item: ClipboardItem) => {
    setSelectedItem(item);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleTypeFilter = (type?: ContentType) => {
    setSelectedType(type);
  };

  return (
    <div className="h-screen flex bg-background">
      <ClipboardSidebar
        items={items}
        selectedItem={selectedItem}
        onSelectItem={handleSelectItem}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedType={selectedType}
        onTypeFilter={handleTypeFilter}
      />
      <ClipboardContent
        item={selectedItem}
        onToggleFavorite={handleToggleFavorite}
        onDelete={handleDelete}
      />
    </div>
  );
};
