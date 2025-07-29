import 'katex/dist/katex.min.css';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Typography from '@tiptap/extension-typography';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Calculator,
  HelpCircle,
  Pi,
  Sigma,
  Wand2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { FormulaSelector } from '../components/formula-selector';
import { VisualFormulaBuilder } from '../components/formula-builder';
import { MathHelp } from '../components/math-help';
import { KatexExtension } from '../components/katext-extension';

interface MathEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  className?: string;
}

export const MathEditor = ({
  content = '',
  onChange,
  className,
}: MathEditorProps) => {
  const [formulaSelectorOpen, setFormulaSelectorOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [builderOpen, setBuilderOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Typography, KatexExtension],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[400px] p-6',
        style: 'caret-color: currentColor;',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  const insertMathFormula = (formula: string, isBlock = false) => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertKatex({
        latex: formula,
        displayMode: isBlock,
      })
      .run();

    setFormulaSelectorOpen(false);
  };

  return (
    <div
      className={cn(
        'w-full max-w-none bg-editor-background border border-editor-border rounded-lg mt-5 ',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-1 p-3 bg-editor-toolbar border-b border-editor-border rounded-t-lg">
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('bold') ? 'default' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold text</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('italic') ? 'default' : 'ghost'}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic text</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('code') ? 'default' : 'ghost'}
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <Code className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Inline code</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('bulletList') ? 'default' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet list</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('orderedList') ? 'default' : 'ghost'}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered list</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={editor.isActive('blockquote') ? 'default' : 'ghost'}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Quote block</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => insertMathFormula('x^{2}')}
              >
                <span className="text-sm font-mono">x²</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Power/Exponent (x²)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => insertMathFormula('\\frac{a}{b}')}
              >
                <span className="text-sm font-mono">a/b</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Fraction (a/b)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => insertMathFormula('\\sqrt{x}')}
              >
                <span className="text-sm font-mono">√x</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Square root (√x)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => insertMathFormula('\\sum_{i=1}^{n}')}
              >
                <Sigma className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Summation (Σ)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" onClick={() => insertMathFormula('\\pi')}>
                <Pi className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Pi (π)</TooltipContent>
          </Tooltip>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Dialog open={builderOpen} onOpenChange={setBuilderOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Wand2 className="h-4 w-4" />
                Build Formula
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 max-w-fit">
              <VisualFormulaBuilder
                onFormulaComplete={insertMathFormula}
                onClose={() => setBuilderOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Popover
            open={formulaSelectorOpen}
            onOpenChange={setFormulaSelectorOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calculator className="h-4 w-4" />
                Quick Insert
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <FormulaSelector onFormulaSelect={insertMathFormula} />
            </PopoverContent>
          </Popover>

          <Popover open={helpOpen} onOpenChange={setHelpOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <HelpCircle className="h-4 w-4" />
                Help
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <MathHelp />
            </PopoverContent>
          </Popover>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="relative">
        <EditorContent
          editor={editor}
          className="prose-editor"
          style={{
            caretColor: 'auto',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
};
