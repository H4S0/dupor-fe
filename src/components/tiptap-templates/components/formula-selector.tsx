import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronDown, ChevronRight, Badge } from 'lucide-react';
import { useState } from 'react';

interface Formula {
  name: string;
  latex: string;
  description: string;
  preview?: string;
}

interface FormulaCategory {
  name: string;
  formulas: Formula[];
}

const formulaCategories: FormulaCategory[] = [
  {
    name: 'Basic Operations',
    formulas: [
      {
        name: 'Fraction',
        latex: '\\frac{a}{b}',
        description: 'Fraction a over b',
        preview: 'a/b',
      },
      {
        name: 'Square Root',
        latex: '\\sqrt{x}',
        description: 'Square root of x',
        preview: '√x',
      },
      {
        name: 'Nth Root',
        latex: '\\sqrt[n]{x}',
        description: 'nth root of x',
        preview: 'ⁿ√x',
      },
      {
        name: 'Power',
        latex: 'x^{n}',
        description: 'x to the power of n',
        preview: 'xⁿ',
      },
      {
        name: 'Subscript',
        latex: 'x_{i}',
        description: 'x with subscript i',
        preview: 'xᵢ',
      },
    ],
  },
  {
    name: 'Calculus',
    formulas: [
      {
        name: 'Integral',
        latex: '\\int f(x) dx',
        description: 'Indefinite integral',
        preview: '∫f(x)dx',
      },
      {
        name: 'Definite Integral',
        latex: '\\int_{a}^{b} f(x) dx',
        description: 'Definite integral from a to b',
        preview: '∫ᵇₐf(x)dx',
      },
      {
        name: 'Derivative',
        latex: '\\frac{d}{dx} f(x)',
        description: 'Derivative of f(x)',
        preview: 'd/dx f(x)',
      },
      {
        name: 'Partial Derivative',
        latex: '\\frac{\\partial f}{\\partial x}',
        description: 'Partial derivative',
        preview: '∂f/∂x',
      },
      {
        name: 'Limit',
        latex: '\\lim_{x \\to a} f(x)',
        description: 'Limit as x approaches a',
        preview: 'lim f(x)',
      },
    ],
  },
  {
    name: 'Algebra',
    formulas: [
      {
        name: 'Summation',
        latex: '\\sum_{i=1}^{n} x_i',
        description: 'Sum from i=1 to n',
        preview: 'Σxᵢ',
      },
      {
        name: 'Product',
        latex: '\\prod_{i=1}^{n} x_i',
        description: 'Product from i=1 to n',
        preview: 'Πxᵢ',
      },
      {
        name: 'Binomial',
        latex: '\\binom{n}{k}',
        description: 'n choose k',
        preview: '(n k)',
      },
      {
        name: 'Matrix 2x2',
        latex: '\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}',
        description: '2x2 matrix',
        preview: '[a b; c d]',
      },
    ],
  },
  {
    name: 'Greek Letters',
    formulas: [
      {
        name: 'Alpha',
        latex: '\\alpha',
        description: 'Greek letter alpha',
        preview: 'α',
      },
      {
        name: 'Beta',
        latex: '\\beta',
        description: 'Greek letter beta',
        preview: 'β',
      },
      {
        name: 'Gamma',
        latex: '\\gamma',
        description: 'Greek letter gamma',
        preview: 'γ',
      },
      {
        name: 'Delta',
        latex: '\\delta',
        description: 'Greek letter delta',
        preview: 'δ',
      },
      {
        name: 'Epsilon',
        latex: '\\epsilon',
        description: 'Greek letter epsilon',
        preview: 'ε',
      },
      {
        name: 'Theta',
        latex: '\\theta',
        description: 'Greek letter theta',
        preview: 'θ',
      },
      {
        name: 'Lambda',
        latex: '\\lambda',
        description: 'Greek letter lambda',
        preview: 'λ',
      },
      {
        name: 'Pi',
        latex: '\\pi',
        description: 'Greek letter pi',
        preview: 'π',
      },
      {
        name: 'Sigma',
        latex: '\\sigma',
        description: 'Greek letter sigma',
        preview: 'σ',
      },
      {
        name: 'Omega',
        latex: '\\omega',
        description: 'Greek letter omega',
        preview: 'ω',
      },
    ],
  },
  {
    name: 'Symbols',
    formulas: [
      {
        name: 'Infinity',
        latex: '\\infty',
        description: 'Infinity symbol',
        preview: '∞',
      },
      {
        name: 'Plus/Minus',
        latex: '\\pm',
        description: 'Plus or minus',
        preview: '±',
      },
      {
        name: 'Approximately',
        latex: '\\approx',
        description: 'Approximately equal',
        preview: '≈',
      },
      {
        name: 'Not Equal',
        latex: '\\neq',
        description: 'Not equal to',
        preview: '≠',
      },
      {
        name: 'Less Equal',
        latex: '\\leq',
        description: 'Less than or equal',
        preview: '≤',
      },
      {
        name: 'Greater Equal',
        latex: '\\geq',
        description: 'Greater than or equal',
        preview: '≥',
      },
    ],
  },
];

interface FormulaSelectorProps {
  onFormulaSelect: (latex: string, isBlock?: boolean) => void;
}

export const FormulaSelector = ({ onFormulaSelect }: FormulaSelectorProps) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    {
      'Basic Operations': true,
    }
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <Card className="w-80 max-h-96 overflow-hidden">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="font-semibold text-sm">Formula Library</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Click any formula to insert
        </p>
      </div>

      <ScrollArea className="h-80">
        <div className="p-2 space-y-2">
          {formulaCategories.map((category) => (
            <Collapsible
              key={category.name}
              open={openCategories[category.name]}
              onOpenChange={() => toggleCategory(category.name)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-2 h-auto"
                >
                  <span className="text-sm font-medium">{category.name}</span>
                  {openCategories[category.name] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent className="space-y-1 pl-2">
                {category.formulas.map((formula) => (
                  <Button
                    key={formula.name}
                    variant="ghost"
                    className="w-full justify-start p-2 h-auto text-left"
                    onClick={() => onFormulaSelect(formula.latex)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Badge className="text-xs font-mono min-w-8">
                        {formula.preview}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {formula.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {formula.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
