import { beforeAll, expect, test } from "vitest";

import { mockIPC } from "@tauri-apps/api/mocks";
import {useTemplates} from "./useTemplates"

test("invoke simple", async () => {
  mockIPC((cmd, args) => {
    // simulated rust command called "add" that just adds two numbers
    if (cmd === "get_template_data") {
      return {
        template_names: ["Test1"],
        template_locations: ["Test location"]
      }
    }
  });

  let expected_response = {
    template_names: ["Test1"],
    template_locations: ["Test location"],
  };
  expect(useTemplates("python")).equals(expected_response)
});
