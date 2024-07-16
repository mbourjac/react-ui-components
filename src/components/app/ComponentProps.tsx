import type { UiComponentProp } from '../../App.types';

type ComponentPropsProps = {
  props: UiComponentProp[];
};

export const ComponentProps = ({
  props: componentProps,
}: ComponentPropsProps) => {
  return (
    <div className="text-primary">
      <div className="overflow-x-auto rounded-2xl text-primary">
        <table>
          <thead className="rounded-t-2xl border-b border-primary bg-off-black">
            <tr>
              <th className="px-4 py-2 text-left font-normal">Prop</th>
              <th className="px-4 py-2 text-left font-normal">Type</th>
              <th className="px-4 py-2 text-left font-normal">Description</th>
            </tr>
          </thead>
          <tbody className="bg-off-black">
            {componentProps.map(
              ({
                name,
                type,
                description,
                required,
                conditionallyRequiredBy,
                defaultValue,
              }) => (
                <tr key={name} className="border-b border-primary/20">
                  <td className="px-4 py-3 align-text-top">{name}</td>
                  <td className="px-4 py-3 align-text-top">
                    {type}
                    {required && ' [required]'}
                    {conditionallyRequiredBy &&
                      ` [required if ${conditionallyRequiredBy} is defined]`}
                    {defaultValue !== undefined &&
                      ` [default: ${defaultValue}]`}
                  </td>
                  <td className="px-4 py-2 align-text-top">{description}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
