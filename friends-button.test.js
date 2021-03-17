//FriendButton.test.js
import axios from "./client/src/superAxios";
import FriendButton from "./client/src/components/FriendButton.js";
import { render, waitFor, act } from "@testing-library/react";

jest.mock("./client/src/superAxios");
test("Makes AJaX request and displays correct for no request.", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: "no request" },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherID={2} />).container;
    });
    expect(axios.get.mock.calls.length).toBe(1);
    expect(container.innerHTML).toContain("send request");
});
test("Existing request should be cancelable.", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: "request by me" },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherID={2} />).container;
    });
    await waitFor(() => container.querySelector(".request-made-to-you"));
    expect(container.innerHTML).toContain("cancel");
});
test("Existing request should be cancelable.", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: "request accepted" },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherID={2} />).container;
    });
    await waitFor(() => container.querySelector(".request-accepted"));
    expect(container.innerHTML).toContain("unfriend");
});
test("Request _TO_ me should be acceptable.", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: "request to you" },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton otherID={1} />).container;
    });
    await waitFor(() => container.querySelector(".request-made-to-you"));
    expect(container.innerHTML).toContain("accept");
});
