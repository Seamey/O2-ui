import { FeedbackResponse } from "@/app/types/Feedback";
import { o2API } from "../api";

export const feedbackApi = o2API.injectEndpoints({
    endpoints: (builder) => ({
        postFeedback: builder.mutation<FeedbackResponse, {message: string; type: string;}>({
            query: ({message, type}) => ({
                url: 'api/feedbacks',
                method: 'POST',
                body: {message, type},
            }),
        }),
    }),
});

export const { usePostFeedbackMutation } = feedbackApi;
