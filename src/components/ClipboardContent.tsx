import { Copy, Star, StarOff, ExternalLink, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { ClipboardItem } from "@/types/clipboard"
import { format } from "date-fns"

interface ClipboardContentProps {
  item?: ClipboardItem
  onToggleFavorite?: (id: string) => void
  onDelete?: (id: string) => void
}

export const ClipboardContent = ({
  item,
  onToggleFavorite,
  onDelete,
}: ClipboardContentProps) => {
  const { toast } = useToast()

  if (!item) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Copy className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Select a clipboard item</h3>
          <p className="text-muted-foreground text-sm">
            Choose an item from the sidebar to view its details and content.
          </p>
        </div>
      </div>
    )
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(item.content)
      toast({
        title: "Copied to clipboard",
        description: "Content has been copied to your clipboard.",
      })
    } catch {
      toast({
        title: "Copy failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      })
    }
  }

    const deleteClip = async () => {
    try {
      const res = await fetch("http://localhost:8080/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          },
          credentials: "include",
        body: JSON.stringify({ id: parseInt(item.id, 10) }), // convert to int
      })

      if (!res.ok) {
        throw new Error("Failed to delete")
      }

      toast({
        title: "Deleted",
        description: "The clip has been deleted successfully.",
      })

      onDelete?.(item.id) // notify parent to remove from UI
    } catch {
      toast({
        title: "Delete failed",
        description: "Could not delete the clipboard item.",
        variant: "destructive",
      })
    }
  }


  const getContentTypeColor = (type: string) => {
    const colors = {
      url: "text-url-accent bg-url-accent/10",
      code: "text-code-accent bg-code-accent/10",
      text: "text-text-accent bg-text-accent/10",
      ai: "text-ai-accent bg-ai-accent/10",
    }
    return (
      colors[type as keyof typeof colors] ||
      "text-muted-foreground bg-muted/10"
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge className={cn("text-xs", getContentTypeColor(item.type))}>
                {item.type.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {format(item.timestamp, "PPpp")}
              </span>
              {item.isFavorite && (
                <Star className="w-4 h-4 text-warning fill-current" />
              )}
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              {item.title ||
                `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} Content`}
            </h1>
            {item.source && (
              <p className="text-sm text-muted-foreground mt-1">
                From: {item.source}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onToggleFavorite?.(item.id)}
              className="gap-2"
            >
              {item.isFavorite ? (
                <StarOff className="w-4 h-4" />
              ) : (
                <Star className="w-4 h-4" />
              )}
              {item.isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy
            </Button>
            {item.type === "url" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(item.content, "_blank")}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={deleteClip}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Metadata */}
        {item.metadata && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {item.metadata.wordCount && (
              <span>{item.metadata.wordCount} words</span>
            )}
            {item.metadata.size && <span>{item.metadata.size} bytes</span>}
            {item.metadata.language && (
              <span>Language: {item.metadata.language}</span>
            )}
            {item.metadata.domain && <span>Domain: {item.metadata.domain}</span>}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-hidden">
        <Card className="h-full flex flex-col bg-gradient-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Content
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <pre className="whitespace-pre-wrap font-mono text-sm text-foreground bg-background p-4 rounded-md border border-border h-full overflow-y-auto">
              {item.content}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
