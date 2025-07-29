import { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { User } from '@/context/auth-context';
import { UseFormReturn, FieldValues, Path } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { ScrollArea } from '../ui/scroll-area';
import { Badge } from '../ui/badge';

type StudentSelectionFieldProps<T extends FieldValues> = {
  students: User[] | undefined;
  form: UseFormReturn<T>;
  fieldName?: Path<T>;
};

const StudentSelectionField = <T extends FieldValues>({
  students,
  form,
  fieldName = 'students' as Path<T>,
}: StudentSelectionFieldProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students?.filter((student: User) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      student.jmb.toString().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-4">
      <FormField
        name={fieldName}
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Students</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search by name or JMB..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mb-2"
                />

                {filteredStudents && filteredStudents.length > 0 ? (
                  <ScrollArea className="h-[150px] p-3">
                    <div className="space-y-3">
                      {filteredStudents.map((student) => (
                        <div
                          key={student._id}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox
                            id={student._id}
                            checked={field.value?.includes(student._id)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              return checked
                                ? field.onChange([...current, student._id])
                                : field.onChange(
                                    current.filter(
                                      (id: string) => id !== student._id
                                    )
                                  );
                            }}
                          />
                          <Label
                            htmlFor={student._id}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <span className="font-medium">
                              {student.firstName} {student.lastName}
                            </span>
                            <Badge variant="outline">{student.jmb}</Badge>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                    No students found
                  </div>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StudentSelectionField;
