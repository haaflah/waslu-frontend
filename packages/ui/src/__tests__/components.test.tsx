import { fireEvent, render, screen } from "@testing-library/react";
import { Badge, Button, Card, Checkbox, FormField, IconButton, Input, Select, Sheet, Skeleton, Spinner, Textarea, Toast } from "../index";

describe("ui components", () => {
  it("renders button and handles keyboard activation", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);
    const button = screen.getByRole("button", { name: "Submit" });
    button.focus();
    fireEvent.keyDown(button, { key: "Enter" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders icon button with accessible label", () => {
    render(<IconButton label="Open navigation">☰</IconButton>);
    expect(screen.getByRole("button", { name: "Open navigation" })).toBeInTheDocument();
  });

  it("renders input and textarea", () => {
    render(
      <>
        <Input aria-label="Email" />
        <Textarea aria-label="Notes" />
      </>
    );
    expect(screen.getByRole("textbox", { name: /Email/ })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Notes" })).toBeInTheDocument();
  });

  it("renders select and checkbox", () => {
    render(
      <>
        <Select aria-label="Role">
          <option>User</option>
        </Select>
        <Checkbox aria-label="Remember me" />
      </>
    );
    expect(screen.getByRole("combobox", { name: "Role" })).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Remember me" })).toBeInTheDocument();
  });

  it("links form field label and hint", () => {
    render(
      <FormField error="Required" hint="Use your primary email" label="Email" required>
        {({ fieldId, hintId, errorId }) => (
          <Input aria-describedby={`${hintId} ${errorId}`} aria-invalid="true" id={fieldId} />
        )}
      </FormField>
    );

    const input = screen.getByRole("textbox", { name: /Email/ });
    expect(input).toBeInTheDocument();
    expect(screen.getByText("Use your primary email")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("renders card and badge", () => {
    render(
      <Card>
        <Badge tone="success">Active</Badge>
      </Card>
    );
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("opens sheet as dialog and closes with escape", () => {
    const onOpenChange = vi.fn();
    render(
      <Sheet description="Description" onOpenChange={onOpenChange} open title="Title">
        <button type="button">Focusable</button>
      </Sheet>
    );
    expect(screen.getByRole("dialog", { name: "Title" })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders toast with status role and dismiss button", () => {
    const onDismiss = vi.fn();
    render(<Toast onDismiss={onDismiss} open status="success" title="Saved" />);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss notification" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders skeleton and spinner", () => {
    render(
      <>
        <Skeleton data-testid="skeleton" />
        <Spinner label="Loading data" />
      </>
    );
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.getByRole("status", { name: "Loading data" })).toBeInTheDocument();
  });
});
