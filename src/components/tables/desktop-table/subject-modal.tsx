import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type SubjectProps = {
  subjectName: string;
  grade: number;
  professorId: string;
  _id: string;
}[];

const SubjectModal = ({ data }: { data: SubjectProps }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {' '}
        Grades
        <span className="text-primary ml-1">{data?.length}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {data?.map((subject) => (
          <AlertDialogHeader>
            <AlertDialogTitle>{subject.subjectName}</AlertDialogTitle>
            <AlertDialogDescription>{subject.grade}</AlertDialogDescription>
          </AlertDialogHeader>
        ))}
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SubjectModal;
