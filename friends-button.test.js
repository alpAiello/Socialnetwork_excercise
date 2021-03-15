//FriendButton.test.js
import axios from "./client/src/superAxios";
import FriendButton from "./FriendButton.js";
import { render, waitFor, act } from "@testing-library/react";

jest.mock("./client/src/superAxios");
test("Makes AJaX request and displays correct for no request.", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: "no-request" },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton id={2} />).container;
    });
    expect(axios.get.mock.calls.length).toBe(1);
    expect(container.innerHTML).toContain("Make friend request");
});
test("Existing request should be cancalable.", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: "request-made-by-you" },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton id={2} />).container;
    });
    await waitFor(() => container.querySelector(".request-made-to-you"));
    expect(container.innerHTML).toContain("Cancel friend request");
});
test("Existing request should be cancalable.", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: "request-accepted" },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton id={2} />).container;
    });
    await waitFor(() => container.querySelector(".request-accepted"));
    expect(container.innerHTML).toContain("Unfriend");
});
test("Request _TO_ me should be acceptable.", async () => {
    axios.get.mockClear().mockResolvedValue({
        data: { status: "request-made-to-you" },
    });
    let container;
    await act(async () => {
        container = render(<FriendButton id={1} />).container;
    });
    await waitFor(() => container.querySelector(".request-made-to-you"));
    expect(container.innerHTML).toContain("Accept");
});
