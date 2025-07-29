import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge, Plus, Check } from 'lucide-react';
import { useState } from 'react';

const equationTemplates: FormulaTemplate[] = [
  {
    id: 'quadratic',
    name: 'Quadratic Formula',
    description: 'The quadratic formula for ax² + bx + c = 0',
    preview: 'x = (-b ± √(b²-4ac))/2a',
    template:
      'x = \\frac{-{{{b}}} \\pm \\sqrt{ {{{b}}}^2 - 4{{{a}}}{{{c}}} }}{2{{{a}}}}',
    fields: [
      {
        id: 'a',
        label: 'Coefficient a',
        placeholder: 'Coefficient of x²',
        defaultValue: 'a',
      },
      {
        id: 'b',
        label: 'Coefficient b',
        placeholder: 'Coefficient of x',
        defaultValue: 'b',
      },
      {
        id: 'c',
        label: 'Constant c',
        placeholder: 'Constant term',
        defaultValue: 'c',
      },
    ],
  },
  {
    id: 'pythagorean',
    name: 'Pythagorean Theorem',
    description: 'a² + b² = c² for right triangles',
    preview: 'a² + b² = c²',
    template: '{{{a}}}^2 + {{{b}}}^2 = {{{c}}}^2',
    fields: [
      {
        id: 'a',
        label: 'Side a',
        placeholder: 'First side',
        defaultValue: 'a',
      },
      {
        id: 'b',
        label: 'Side b',
        placeholder: 'Second side',
        defaultValue: 'b',
      },
      {
        id: 'c',
        label: 'Hypotenuse c',
        placeholder: 'Hypotenuse',
        defaultValue: 'c',
      },
    ],
  },
];

interface FormulaBuilderProps {
  onFormulaComplete: (latex: string, isBlock?: boolean) => void;
  onClose: () => void;
}

interface FormulaTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  template: string;
  fields: Array<{
    id: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
  }>;
}

const formulaTemplates: FormulaTemplate[] = [
  {
    id: 'fraction',
    name: 'Fraction',
    description: 'Create a fraction a/b',
    preview: 'a/b',
    template: '\\frac{{{numerator}}}{{{denominator}}}',
    fields: [
      {
        id: 'numerator',
        label: 'Top (numerator)',
        placeholder: 'Enter top number',
        defaultValue: 'a',
      },
      {
        id: 'denominator',
        label: 'Bottom (denominator)',
        placeholder: 'Enter bottom number',
        defaultValue: 'b',
      },
    ],
  },
  {
    id: 'power',
    name: 'Power/Exponent',
    description: 'Create x to the power of n',
    preview: 'x^n',
    template: '{{{base}}}^{{{exponent}}}',
    fields: [
      {
        id: 'base',
        label: 'Base',
        placeholder: 'What number/variable',
        defaultValue: 'x',
      },
      {
        id: 'exponent',
        label: 'Power',
        placeholder: 'Power/exponent',
        defaultValue: 'n',
      },
    ],
  },
  {
    id: 'sqrt',
    name: 'Square Root',
    description: 'Create square root of a number',
    preview: '√x',
    template: '\\sqrt{{{value}}}',
    fields: [
      {
        id: 'value',
        label: 'Value inside root',
        placeholder: 'What goes under the root',
        defaultValue: 'x',
      },
    ],
  },
  {
    id: 'nthroot',
    name: 'Nth Root',
    description: 'Create nth root of a number',
    preview: 'ⁿ√x',
    template: '\\sqrt[{{{n}}}]{{{value}}}',
    fields: [
      {
        id: 'n',
        label: 'Root number',
        placeholder: 'Which root (2, 3, 4...)',
        defaultValue: 'n',
      },
      {
        id: 'value',
        label: 'Value inside root',
        placeholder: 'What goes under the root',
        defaultValue: 'x',
      },
    ],
  },
  {
    id: 'integral',
    name: 'Integral',
    description: 'Create definite or indefinite integral',
    preview: '∫f(x)dx',
    template: '\\int_{{{lower}}}^{{{upper}}} {{{function}}} d{{{variable}}}',
    fields: [
      {
        id: 'lower',
        label: 'Lower limit',
        placeholder: 'Start value (leave empty for indefinite)',
        defaultValue: 'a',
      },
      {
        id: 'upper',
        label: 'Upper limit',
        placeholder: 'End value (leave empty for indefinite)',
        defaultValue: 'b',
      },
      {
        id: 'function',
        label: 'Function',
        placeholder: 'Function to integrate',
        defaultValue: 'f(x)',
      },
      {
        id: 'variable',
        label: 'Variable',
        placeholder: 'Integration variable',
        defaultValue: 'x',
      },
    ],
  },
  {
    id: 'sum',
    name: 'Summation',
    description: 'Create a sum from i=start to end',
    preview: 'Σf(i)',
    template: '\\sum_{{{variable}}={{{start}}}}^{{{end}}} {{{expression}}}',
    fields: [
      {
        id: 'variable',
        label: 'Sum variable',
        placeholder: 'Variable name (i, k, n...)',
        defaultValue: 'i',
      },
      {
        id: 'start',
        label: 'Start value',
        placeholder: 'Starting number',
        defaultValue: '1',
      },
      {
        id: 'end',
        label: 'End value',
        placeholder: 'Ending value',
        defaultValue: 'n',
      },
      {
        id: 'expression',
        label: 'Expression',
        placeholder: 'What to sum',
        defaultValue: 'f(i)',
      },
    ],
  },
];

export const VisualFormulaBuilder = ({
  onFormulaComplete,
  onClose,
}: FormulaBuilderProps) => {
  const [selectedTemplate, setSelectedTemplate] =
    useState<FormulaTemplate | null>(null);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [isBlock, setIsBlock] = useState(false);

  const handleTemplateSelect = (template: FormulaTemplate) => {
    setSelectedTemplate(template);
    const initialValues: Record<string, string> = {};
    template.fields.forEach((field) => {
      initialValues[field.id] = field.defaultValue || '';
    });
    setFieldValues(initialValues);
  };

  const handleFieldChange = (fieldId: string, value: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const generatePreview = () => {
    if (!selectedTemplate) return '';

    let result = selectedTemplate.template;
    Object.entries(fieldValues).forEach(([key, value]) => {
      const cleanValue =
        value.trim() ||
        selectedTemplate.fields.find((f) => f.id === key)?.defaultValue ||
        key;
      result = result.replace(new RegExp(`{{{${key}}}}`, 'g'), cleanValue);
    });

    return result;
  };

  const handleComplete = () => {
    const latex = generatePreview();
    onFormulaComplete(latex, isBlock);
    onClose();
  };

  const handleBack = () => {
    setSelectedTemplate(null);
    setFieldValues({});
  };

  if (!selectedTemplate) {
    return (
      <Card className="w-[500px] max-h-[500px] overflow-hidden">
        <div className="p-4 border-b bg-muted/50">
          <h3 className="font-semibold">Visual Formula Builder</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Build formulas by filling in the blanks
          </p>
        </div>

        <Tabs defaultValue="basic" className="h-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="basic">Basic Formulas</TabsTrigger>
            <TabsTrigger value="equations">Common Equations</TabsTrigger>
          </TabsList>

          <div className="max-h-[400px] overflow-y-auto">
            <TabsContent value="basic" className="p-4 space-y-3 mt-0">
              {formulaTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="ghost"
                  className="w-full p-4 h-auto justify-start"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <Badge className="text-xs font-mono mt-0.5">
                      {template.preview}
                    </Badge>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                    <Plus className="h-4 w-4 opacity-50" />
                  </div>
                </Button>
              ))}
            </TabsContent>

            <TabsContent value="equations" className="p-4 space-y-3 mt-0">
              {equationTemplates.map((template) => (
                <Button
                  key={template.id}
                  variant="ghost"
                  className="w-full p-4 h-auto justify-start"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start gap-3 w-full">
                    <Badge className="text-xs font-mono mt-0.5">
                      {template.preview}
                    </Badge>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {template.description}
                      </div>
                    </div>
                    <Plus className="h-4 w-4 opacity-50" />
                  </div>
                </Button>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    );
  }

  return (
    <Card className="w-[500px] max-h-[500px] overflow-hidden">
      <div className="p-4 border-b bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Building: {selectedTemplate.name}</h3>
            <p className="text-sm text-muted-foreground">
              {selectedTemplate.description}
            </p>
          </div>
          <Badge className="font-mono">{selectedTemplate.preview}</Badge>
        </div>
      </div>

      <div className="p-4 space-y-4 max-h-[350px] overflow-y-auto">
        <div className="space-y-3">
          {selectedTemplate.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.label}
              </Label>
              <Input
                id={field.id}
                placeholder={field.placeholder}
                value={fieldValues[field.id] || ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
                className="text-sm"
              />
            </div>
          ))}
        </div>

        <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
          <Label className="text-xs font-medium text-muted-foreground">
            Live Preview:
          </Label>
          <div className="font-mono text-sm bg-background p-2 rounded border">
            ${generatePreview()}$
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isBlock}
              onChange={(e) => setIsBlock(e.target.checked)}
              className="rounded"
            />
            Display as block (centered, larger)
          </label>
        </div>
      </div>

      <div className="p-4 border-t bg-muted/20 flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          ← Back to Templates
        </Button>
        <Button onClick={handleComplete} className="gap-2">
          <Check className="h-4 w-4" />
          Insert Formula
        </Button>
      </div>
    </Card>
  );
};
