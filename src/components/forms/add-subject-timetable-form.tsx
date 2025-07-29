import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { createTimetableSchema } from './create-timetable-form';
import z from 'zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { User } from '@/context/auth-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type FormValues = z.infer<typeof createTimetableSchema>;

type AddSubjectToTimetableFormProps = {
  form: UseFormReturn<FormValues>;
  professors: User[] | undefined;
};

const AddSubjectToTimetableForm = ({
  form,
  professors,
}: AddSubjectToTimetableFormProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'subjects',
  });

  return (
    <div className="space-y-4 mt-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Subjects</h3>
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            append({
              subjectName: '',
              professorId: '',
              startTime: '',
              endTime: '',
              room: '',
            })
          }
        >
          + Add Subject
        </Button>
      </div>

      {fields.length > 0 && (
        <ScrollArea className="h-[300px] p-3">
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-lg space-y-2 relative bg-muted"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`subjects.${index}.subjectName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Math" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                </div>

                <FormField
                  control={form.control}
                  name={`subjects.${index}.startTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject start time</FormLabel>
                      <FormControl>
                        <Input placeholder="9:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`subjects.${index}.endTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject end time</FormLabel>
                      <FormControl>
                        <Input placeholder="9:45" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`subjects.${index}.room`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classroom</FormLabel>
                      <FormControl>
                        <Input placeholder="302-A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="w-full"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default AddSubjectToTimetableForm;
