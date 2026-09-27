import type { Person } from '@/content/about';

const initialsOf = (name: string) =>
  name
    .replace(/^(dr|prof|mr|ms|mrs)\.?\s+/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

// A plain portrait with the name and role underneath, no card chrome.
export const PersonCard = ({ person }: { person: Person }) => {
  const heading = person.credentials ? `${person.name}, ${person.credentials}` : person.name;
  const body = (
    <div className="group">
      <div className="aspect-square overflow-hidden bg-[#06005A]">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-full items-center justify-center font-[family-name:var(--font-display)] text-6xl font-medium text-white/85"
          >
            {initialsOf(person.name)}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-[#151B17] group-hover:underline group-hover:underline-offset-4">
        {heading}
      </h3>
      <p className="mt-0.5 text-base text-gray-600">{person.role}</p>
      {person.affiliation && <p className="mt-2 text-sm text-gray-500">{person.affiliation}</p>}
      {person.bio && <p className="mt-2 text-sm leading-relaxed text-gray-600">{person.bio}</p>}
    </div>
  );

  return person.url ? (
    <a href={person.url} target="_blank" rel="noopener noreferrer" className="block">
      {body}
    </a>
  ) : (
    body
  );
};
