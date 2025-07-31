import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextGenerator = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateText = () => {
    if (!input1.trim() || !input2.trim()) {
      toast({
        title: "Missing inputs",
        description: "Please fill in both input fields to generate text.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate text generation with creative combinations
    setTimeout(() => {
      const templates = [
        `In a world where ${input1} meets ${input2}, extraordinary things happen. The convergence creates new possibilities that were never thought possible before.`,
        `Picture this: ${input1} and ${input2} coming together in perfect harmony. This unique combination sparks innovation and creativity beyond imagination.`,
        `What if ${input1} could transform ${input2}? The result would be a revolutionary breakthrough that changes everything we know.`,
        `The magic happens when ${input1} embraces ${input2}. Together, they create a symphony of innovation that resonates through time.`,
        `Imagine a future where ${input1} and ${input2} work in perfect synchronization, creating outcomes that surpass all expectations.`,
      ];

      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setGeneratedText(randomTemplate);
      setIsGenerating(false);

      toast({
        title: "Text generated!",
        description: "Your creative text has been generated successfully.",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    toast({
      title: "Copied!",
      description: "Generated text copied to clipboard.",
    });
  };

  const clearAll = () => {
    setInput1("");
    setInput2("");
    setGeneratedText("");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-primary bg-clip-text text-transparent">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">AI Text Generator</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Combine two concepts to create unique, creative text
          </p>
        </div>

        {/* Input Section */}
        <Card className="bg-gradient-card border border-border p-6 shadow-card">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="input1" className="text-foreground font-medium">
                  First Concept
                </Label>
                <Input
                  id="input1"
                  placeholder="e.g., artificial intelligence"
                  value={input1}
                  onChange={(e) => setInput1(e.target.value)}
                  className="bg-background/50 border-border focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="input2" className="text-foreground font-medium">
                  Second Concept
                </Label>
                <Input
                  id="input2"
                  placeholder="e.g., creative writing"
                  value={input2}
                  onChange={(e) => setInput2(e.target.value)}
                  className="bg-background/50 border-border focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={generateText}
                disabled={isGenerating}
                variant="gradient"
                size="lg"
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Text
                  </>
                )}
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                size="lg"
              >
                Clear All
              </Button>
            </div>
          </div>
        </Card>

        {/* Output Section */}
        {generatedText && (
          <Card className="bg-gradient-card border border-border p-6 shadow-card animate-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-foreground font-medium text-lg">
                  Generated Text
                </Label>
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="sm"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={generatedText}
                readOnly
                className="min-h-[120px] bg-background/50 border-border resize-none"
              />
            </div>
          </Card>
        )}

        {/* Examples */}
        <Card className="bg-gradient-card border border-border p-6 shadow-card">
          <h3 className="text-foreground font-medium text-lg mb-4">
            Try these example combinations:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Space exploration + Ocean mysteries</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Quantum physics + Music composition</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Ancient wisdom + Modern technology</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Digital art + Environmental conservation</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Virtual reality + Education</span>
              </div>
              <div className="flex gap-2">
                <span className="text-primary">•</span>
                <span className="text-muted-foreground">Robotics + Human emotions</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TextGenerator;