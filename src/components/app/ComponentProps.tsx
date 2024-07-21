import type { PropData } from '../../App.types';

type ComponentPropsProps = {
  propsData: PropData[];
};

export const ComponentProps = ({ propsData }: ComponentPropsProps) => {
  return (
    <div className="text-primary">
      <div className="overflow-x-auto rounded-2xl text-primary">
        <table className="w-full">
          <thead className="rounded-t-2xl border-b border-primary bg-off-black">
            <tr>
              <th className="px-4 py-2 text-left font-normal">Prop</th>
              <th className="px-4 py-2 text-left font-normal">Type</th>
              <th className="px-4 py-2 text-left font-normal">Description</th>
            </tr>
          </thead>
          <tbody className="bg-off-black">
            {propsData.map(
              ({
                name,
                type,
                description,
                required,
                conditionallyRequiredBy,
                defaultValue,
              }) => (
                <tr
                  key={name}
                  className="relative after:absolute after:bottom-0 after:left-0 after:mx-4 after:block after:h-[1px] after:w-[calc(100%-2rem)] after:bg-primary/25 last:after:h-0"
                >
                  <td className="p-4 align-text-top">{name}</td>
                  <td className="p-4 align-text-top">
                    {type}
                    {required && ' [required]'}
                    {conditionallyRequiredBy &&
                      ` [required if ${conditionallyRequiredBy} is defined]`}
                    {defaultValue !== undefined &&
                      ` [default: ${defaultValue}]`}
                  </td>
                  <td className="p-4 align-text-top">{description}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
