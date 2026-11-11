import { messages } from "@ethannet/messages";
import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta: Meta<typeof Logo> = {
  title: "Layout/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The text wordmark, linking to `/`. Its text and accessible name come from the `Logo` messages. Replace the text with an image here when a logo exists.",
      },
    },
  },
  args: { messages: messages.Logo },
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
