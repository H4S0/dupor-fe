import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from 'lucide-react';

interface MathExample {
  description: string;
  latex: string;
  display: string;
}

const quickExamples: MathExample[] = [
  {
    description: 'Simple fraction',
    latex: '$\\frac{1}{2}$',
    display: '1/2',
  },
  {
    description: 'Square root',
    latex: '$\\sqrt{16} = 4$',
    display: '√16 = 4',
  },
  {
    description: 'Power/exponent',
    latex: '$x^2 + y^2 = z^2$',
    display: 'x² + y² = z²',
  },
  {
    description: 'Subscript',
    latex: '$a_1, a_2, a_3$',
    display: 'a₁, a₂, a₃',
  },
];

const advancedExamples: MathExample[] = [
  {
    description: 'Quadratic formula',
    latex: '$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$',
    display: 'x = (-b ± √(b²-4ac))/2a',
  },
  {
    description: 'Definite integral',
    latex: '$$\\int_0^1 x^2 dx = \\frac{1}{3}$$',
    display: '∫₀¹ x² dx = 1/3',
  },
  {
    description: 'Summation',
    latex: '$$\\sum_{i=1}^n i = \\frac{n(n+1)}{2}$$',
    display: 'Σᵢ₌₁ⁿ i = n(n+1)/2',
  },
  {
    description: 'Matrix',
    latex: '$$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$$',
    display: '[1 2; 3 4]',
  },
];

const syntaxTips = [
  {
    tip: 'Inline math',
    syntax: '$...$',
    example: '$x^2$',
    note: 'Use single dollar signs for inline formulas',
  },
  {
    tip: 'Block math',
    syntax: '$$...$$',
    example: '$$\\frac{a}{b}$$',
    note: 'Use double dollar signs for centered formulas',
  },
  {
    tip: 'Fractions',
    syntax: '\\frac{top}{bottom}',
    example: '\\frac{1}{2}',
    note: 'Use curly braces for numerator and denominator',
  },
  {
    tip: 'Superscript',
    syntax: 'x^{power}',
    example: 'x^{2}',
    note: 'Use curly braces for multi-character exponents',
  },
  {
    tip: 'Subscript',
    syntax: 'x_{index}',
    example: 'x_{1}',
    note: 'Use curly braces for multi-character subscripts',
  },
];

export const MathHelp = () => {
  return (
    <Card className="w-96 max-h-96 overflow-hidden">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="font-semibold text-sm">Math Help & Examples</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Learn LaTeX math syntax
        </p>
      </div>

      <Tabs defaultValue="quick" className="h-full">
        <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
          <TabsTrigger value="quick" className="text-xs">
            Quick
          </TabsTrigger>
          <TabsTrigger value="advanced" className="text-xs">
            Advanced
          </TabsTrigger>
          <TabsTrigger value="syntax" className="text-xs">
            Syntax
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="h-80">
          <TabsContent value="quick" className="p-3 space-y-3 mt-0">
            {quickExamples.map((example, index) => (
              <div
                key={index}
                className="space-y-2 pb-3 border-b border-border/50 last:border-0"
              >
                <h4 className="text-sm font-medium">{example.description}</h4>
                <div className="space-y-1">
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    {example.latex}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Shows as: <Badge>{example.display}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="advanced" className="p-3 space-y-3 mt-0">
            {advancedExamples.map((example, index) => (
              <div
                key={index}
                className="space-y-2 pb-3 border-b border-border/50 last:border-0"
              >
                <h4 className="text-sm font-medium">{example.description}</h4>
                <div className="space-y-1">
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    {example.latex}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Shows as: <Badge>{example.display}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="syntax" className="p-3 space-y-3 mt-0">
            {syntaxTips.map((tip, index) => (
              <div
                key={index}
                className="space-y-2 pb-3 border-b border-border/50 last:border-0"
              >
                <h4 className="text-sm font-medium">{tip.tip}</h4>
                <div className="space-y-1">
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    {tip.syntax}
                  </div>
                  <div className="bg-primary/5 p-2 rounded text-xs font-mono">
                    {tip.example}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tip.note}
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
};
