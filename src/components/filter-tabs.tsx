import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function FilterTabs({
	options,
	value,
	onChange,
	label,
}: {
	options: string[];
	value: string;
	onChange: (value: string) => void;
	label: string;
}) {
	return (
		<ToggleGroup
			value={[value]}
			onValueChange={(values) => {
				if (values[0]) onChange(values[0]);
			}}
			aria-label={label}
			size="sm"
			className="flex-wrap"
		>
			{options.map((option) => (
				<ToggleGroupItem key={option} value={option}>
					{option}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
