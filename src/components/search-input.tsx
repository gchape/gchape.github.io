import { Search, X } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";

export function SearchInput({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<InputGroup className="w-full sm:w-44">
			<InputGroupInput
				type="search"
				aria-label="Search articles"
				placeholder="Search posts"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				className="[&::-webkit-search-cancel-button]:hidden"
			/>
			<InputGroupAddon>
				<Search aria-hidden="true" />
			</InputGroupAddon>
			{value && (
				<InputGroupAddon align="inline-end">
					<InputGroupButton size="icon-xs" onClick={() => onChange("")} aria-label="Clear search">
						<X aria-hidden="true" />
					</InputGroupButton>
				</InputGroupAddon>
			)}
		</InputGroup>
	);
}
