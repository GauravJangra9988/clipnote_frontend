import { Clock, Code, Globe, FileText, Sparkles, Search, Filter, SortAsc, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ClipboardItem, ContentType } from "@/types/clipboard";
import { format } from "date-fns";
import { LiveIndicator } from "./ui/livePulse";
import { useNavigate } from "react-router-dom";

const URL = import.meta.env.VITE_API_URL



interface ClipboardSidebarProps {
  items: ClipboardItem[];
  selectedItem?: ClipboardItem;
  onSelectItem: (item: ClipboardItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedType?: ContentType;
  onTypeFilter: (type?: ContentType) => void;
}

const contentTypeConfig = { url: { icon: Globe, color: 'text-url-accent', bg: 'bg-url-accent/10', label: 'URL' }, code: { icon: Code, color: 'text-code-accent', bg: 'bg-code-accent/10', label: 'Code' }, text: { icon: FileText, color: 'text-text-accent', bg: 'bg-text-accent/10', label: 'Text' }, ai: { icon: Sparkles, color: 'text-ai-accent', bg: 'bg-ai-accent/10', label: 'AI' },};
// fallback if type is missing or unknown
const defaultConfig = {
  icon: FileText,
  color: "text-muted-foreground",
  bg: "bg-muted/10",
  label: "Other",
};



export const ClipboardSidebar = ({
  items,
  selectedItem,
  onSelectItem,
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeFilter,
}: ClipboardSidebarProps) => {
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    const date = format(item.timestamp, "yyyy-MM-dd");
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, ClipboardItem[]>);

  const navigate = useNavigate()

  const onClickLogout = async() =>{
    const res = await fetch(`${URL}/logout`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      credentials: "include"
    })
    if(res.ok){
      navigate("/auth")
    }
}

  return (
    
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border ">
        <div className="flex flex-row justify-between mb-3">
          <h2 className="text-2xl font-bold tracking-widest uppercase text-sidebar-foreground">ClipNote</h2>
          <LiveIndicator />
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search your clipboard..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter</span>
          <SortAsc className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Date</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!selectedType ? "default" : "outline"}
            size="sm"
            onClick={() => onTypeFilter(undefined)}
            className="h-7 text-xs"
          >
            All
          </Button>
          {Object.entries(contentTypeConfig).map(([type, config]) => {
            const Icon = config.icon;
            return (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => onTypeFilter(type as ContentType)}
                className="h-7 text-xs gap-1"
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Items List */}
 <div className="flex-1 overflow-y-auto">
  {Object.entries(groupedItems).map(([date, dateItems]) => (
    <div key={date} className="p-4">
      <h3 className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        {date === format(new Date(), "yyyy-MM-dd") ? "Today" : format(new Date(date), "MMM dd, yyyy")}
      </h3>
      <div className="space-y-2">
        {dateItems
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // 🔥 sort latest → oldest
          .map((item) => {
            const config = contentTypeConfig[item.type] || defaultConfig;
            const Icon = config.icon;
            const isSelected = selectedItem?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all duration-200 group",
                  "border hover:shadow-md",
                  isSelected
                    ? "bg-sidebar-accent border-sidebar-primary shadow-glow"
                    : "bg-sidebar-background border-sidebar-border hover:bg-sidebar-accent/50"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-md", config.bg)}>
                    <Icon className={cn("w-4 h-4", config.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">
                        {format(item.timestamp, "hh:mm a")}
                      </span>
                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-sidebar-foreground line-clamp-2 leading-tight">
                      {item.title || item.content}
                    </p>
                    {item.preview && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {item.preview}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ))}
  {filteredItems.length === 0 && (
    <div className="p-8 text-center">
      <div className="text-muted-foreground">
        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No clips found</p>
        <p className="text-xs">Try adjusting your search or filters</p>
      </div>
    </div>
  )}
</div>

      <div className="p-4 border-sidebar-border">
      <Button
  variant="outline"
  size="default"
  className="w-full justify-center gap-2 text-red-600 border-red-600 hover:bg-red-600"
  onClick={onClickLogout} // replace with your logout handler
>
  <LogOut className="w-4 h-4" />
  Logout
</Button>
</div>

    
    </div>
  );
};


