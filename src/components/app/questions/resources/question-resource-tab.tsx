import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { QuestionResources } from '@prisma/client';
import Link from 'next/link';

export default function QuestionResourceTab(opts: {
  resources: QuestionResources[] | undefined;
  reference?: string;
}) {
  const { resources, reference } = opts;

  if (!resources || resources.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 mt-2">
        <p className="text-sm text-gray-400">
          It looks like there are no resources for this question. If you have a resource that you
          think would be helpful for this question, please let us know!
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button href="mailto:team@bizlevel.dev">Suggest a resource</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black-100 border border-black-50">
            <AlertDialogHeader>
              <AlertDialogTitle>Suggest a resource</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-y-2">
                If you have a resource that you think would be helpful for this question, please let
                us know!
                <br />
                {reference && (
                  <span>
                    Please use the reference: <span className="font-bold">{reference}</span>
                  </span>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white text-black">Cancel</AlertDialogCancel>
              <AlertDialogAction>
                <Link href="mailto:team@bizlevel.dev">Send resource</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-5">
      <ul className="list-disc list-inside mt-2">
        {resources?.map((resource) => (
          <li key={resource.uid}>
            <a
              href={resource.resource}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-accent duration-300 text-lg"
            >
              {resource.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-y-3 w-full gap-5">
        <p className="text-sm font-onest font-light">
          Have a resource that you think would help others answer this question?
        </p>
        <Button variant="secondary">Suggest a resource</Button>
      </div>
    </div>
  );
}
