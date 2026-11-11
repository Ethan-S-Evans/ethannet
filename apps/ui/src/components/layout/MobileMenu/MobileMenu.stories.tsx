import { messages } from "@ethannet/messages";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { sampleNavLinks } from "../fixtures";
import { MobileMenu } from "./MobileMenu";

const meta: Meta<typeof MobileMenu> = {
  title: "Layout/MobileMenu",
  component: MobileMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Hamburger button that slides a navigation panel in from the right (about a third of the screen, at least 16rem). Closes on the X button, a backdrop click, Escape, or any link click. The header hides it from 768px up.",
      },
    },
  },
  globals: { viewport: { value: "mobile2", isRotated: false } },
  args: { links: sampleNavLinks, messages: messages.MobileMenu },
};
export default meta;

type Story = StoryObj<typeof MobileMenu>;

export const Closed: Story = {};

/** Opened by clicking the hamburger. */
export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("button", {
      name: messages.MobileMenu.openLabel,
    });
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(
      canvas.getByRole("navigation", { name: messages.MobileMenu.navLabel }),
    ).toBeInTheDocument();
  },
};
