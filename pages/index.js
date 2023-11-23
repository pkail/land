import Image from 'next/image'
import { Inter } from 'next/font/google'
import {CheckboxGroup, Checkbox} from "@nextui-org/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const handleChange = (value) => alert(value)
  return (
	  <>
		  <div className="text-3xl underline text-red-500">
		  Uvo is on my lap.

		  </div>
    <CheckboxGroup
      label="Select cities"
      defaultValue={["buenos-aires", "london"]}
	  onChange={handleChange}

    >
      <Checkbox value="buenos-aires">Buenos Aires</Checkbox>
      <Checkbox value="sydney">Sydney</Checkbox>
      <Checkbox value="san-francisco">San Francisco</Checkbox>
      <Checkbox value="london">London</Checkbox>
      <Checkbox value="tokyo">Tokyo</Checkbox>
    </CheckboxGroup>
	</>
  )
}
