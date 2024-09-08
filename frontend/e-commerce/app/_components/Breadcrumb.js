import Link from 'next/link';

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function Breadcrumb({ array }) {
  return (
    <div className="breadcrumbs text-xs font-bold ml-4 xs:mb-8 lg:mb-0">
      <ul className="mx-auto">
        {array.map((item, index) => (
          <li key={index}>
            {item.url ? (
              <Link href={item.url}>
                {capitalizeFirstLetter(item.label)}
              </Link>
            ) : (
              capitalizeFirstLetter(item.label)
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
