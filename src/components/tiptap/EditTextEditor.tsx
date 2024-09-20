import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import {
  Bold,
  Code,
  CornerDownLeft,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Redo,
  RemoveFormatting,
  SquareCode,
  Strikethrough,
  TextQuote,
  Undo,
  WrapText,
  YoutubeIcon,
} from 'lucide-react';
import { useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { extensions } from './extensions';

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const handleAddYoutube = () => {
    const url = prompt('Enter Youtube URL');
    if (url) {
      editor
        .chain()
        .focus()
        .setYoutubeVideo({
          src: url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          width: 640,
          height: 360,
        })
        .run();
    }
  };

  const handleClickAddOpenFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <div className="flex gap-2 mt-2 flex-wrap sticky top-0 bg-[#fff] z-10 py-2 px-2 border-b mb-4">
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Strikethrough className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Code className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().unsetAllMarks().run()} variant="outline" size="icon">
          <Eraser className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().clearNodes().run()} variant="outline" size="icon">
          <RemoveFormatting className="w-4 h-4" />
        </Button>
        <Input type="color" className="w-10 p-1 rounded-sm" value="#000000" onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
        <Button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Pilcrow className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Heading3 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={editor.isActive('heading', { level: 4 }) ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Heading4 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={editor.isActive('heading', { level: 5 }) ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Heading5 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={editor.isActive('heading', { level: 6 }) ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <Heading6 className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <SquareCode className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'text-shade-1-100% bg-secondary hover:text-shade-1-85% hover:bg-secondary/80' : ''}
          variant="outline"
          size="icon"
        >
          <TextQuote className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} variant="outline" size="icon">
          <WrapText className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().setHardBreak().run()} variant="outline" size="icon">
          <CornerDownLeft className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} variant="outline" size="icon">
          <Undo className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} variant="outline" size="icon">
          <Redo className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={() => handleAddYoutube()} variant="outline" size="icon">
          <YoutubeIcon className="w-4 h-4" />
        </Button>
        <Button type="button" onClick={() => handleClickAddOpenFile()} variant="outline" size="icon">
          <ImagePlus className="w-4 h-4" />
        </Button>
      </div>
    </>
  );
};

export default function EditTextEditor({ content = '<h2>This is a example</h2>', handleUpdate = (string: string) => {} }: any) {
  return (
    <EditorProvider
      slotBefore={
        <>
          <MenuBar />
        </>
      }
      extensions={extensions}
      content={content}
      editable={true}
      onUpdate={({ editor }) => {
        handleUpdate(editor.getHTML());
      }}
    >
      {null}
    </EditorProvider>
  );
}
