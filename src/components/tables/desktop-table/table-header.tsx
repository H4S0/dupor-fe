import { Input } from '@/components/ui/input';
import { FC } from 'react';

interface TableHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  ActionCreateButton?: React.ComponentType<any>;
  actionCreateButtonProps?: any;
  title?: string;
  descriptionWord?: string;
  searchPlaceholder: string;
}

const TableHeader: FC<TableHeaderProps> = ({
  searchQuery,
  onSearchChange,
  ActionCreateButton,
  actionCreateButtonProps,
  title,
  descriptionWord,
  searchPlaceholder,
}) => {
  return (
    <div className="mb-6 w-full">
      <div className="mb-3 text-center sm:text-left">
        <h2 className="text-lg font-semibold text-primary">{title}</h2>
        <p className="text-sm text-muted-foreground">
          Search through the list or add a new {descriptionWord} below.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="w-full sm:max-w-md">
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        {ActionCreateButton && (
          <div className="w-full sm:w-auto">
            <ActionCreateButton {...actionCreateButtonProps} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
