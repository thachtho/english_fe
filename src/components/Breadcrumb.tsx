import { Link } from 'react-router-dom';

export interface IBreadCrumb {
  url?: string;
  name: string;
  isPrimary?: boolean;
}

const Breadcrumb = ({ breadCrumb }: { breadCrumb: IBreadCrumb[] }) => {
  return (
    <div>
      <nav>
        <ol className="flex items-center mb-2">
          {breadCrumb.map((item, i) => {
            const { url = '', name = '', isPrimary } = item;

            if (!isPrimary) {
              return (
                <li key={i}>
                  <Link to={url}>{name} /</Link>
                </li>
              );
            }

            return (
              <li key={i} className="text-primary">
                {name}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
