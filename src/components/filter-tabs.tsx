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
			spacing={1}
			className="max-w-full flex-wrap rounded-full bg-muted/70 p-1"
		>
			{options.map((option) => (
				<ToggleGroupItem
					key={option}
					value={option}
					className="px-3.5 text-sm font-medium text-muted-foreground aria-pressed:bg-card aria-pressed:text-foreground aria-pressed:shadow-sm"
				>
					{option}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
