import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { EditTimetableSchema } from './edit-timetable-form';
import z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Trash } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { User } from '@/context/auth-context';

type FormValues = z.infer<typeof EditTimetableSchema>;

type EditSubjectToTimetableFormProps = {
  form: UseFormReturn<FormValues>;
  professors: User[] | undefined;
};

const EditSubjectForm = ({
  form,
  professors,
}: EditSubjectToTimetableFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subjects',
  });

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[300px] p-3">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border bg-muted/30 p-3 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  name={`subjects.${index}.subjectName`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Subject</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Math"
                          className="text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name={`subjects.${index}.room`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Room</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. A1"
                          className="text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField
                  name={`subjects.${index}.professorId`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main professor</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a professor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {professors ? (
                                professors.map((professor) => (
                                  <SelectItem
                                    key={professor._id}
                                    value={professor._id}
                                  >
                                    {professor.firstName}
                                  </SelectItem>
                                ))
                              ) : (
                                <SelectItem value="none">
                                  There is no created professors
                                </SelectItem>
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    name={`subjects.${index}.startTime`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Start</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="08:00"
                            className="text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name={`subjects.${index}.endTime`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">End</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="08:45"
                            className="text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  size="icon"
                  variant="ghost"
                  className="text-destructive hover:text-destructive"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Add Subject Button */}
      <Button
        type="button"
        onClick={() =>
          append({
            subjectName: '',
            room: '',
            professorId: '',
            startTime: '',
            endTime: '',
          })
        }
        variant="outline"
        className="w-full"
      >
        + Add Subject
      </Button>
    </div>
  );
};

export default EditSubjectForm;
