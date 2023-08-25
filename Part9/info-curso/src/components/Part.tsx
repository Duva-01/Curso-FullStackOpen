import { CoursePart } from '../types';
import { assertNever } from '../utils';

const Part = ({ part }: { part: CoursePart }) => (
  <p>
    <b>
      {part.name} {part.exerciseCount}
    </b>
    <br />
    {'description' in part && (
      <i>
        {part.description}
        <br />
      </i>
    )}
    {(() => {
      switch (part.type) {
        case 'normal':
          break;
        case 'groupProject':
          return <>project exercises {part.groupProjectCount}</>;
        case 'special':
          return <>required skills: {part.requirements.join(', ')}</>;
        case 'submission':
          return (
            <a
              href={part.exerciseSubmissionLink}
              rel="noreferrer"
              target="_blank"
            >
              submissions
            </a>
          );
        default:
          return assertNever(part);
      }
    })()}
  </p>
);

export default Part;