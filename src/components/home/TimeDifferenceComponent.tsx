type Props = {
    createdAt: string;
}

const getTimeDifference = (createdAt: string) => {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const diffMs = now.getTime() - createdDate.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30.44));
    const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));

    if (years > 0) return `${years} ឆ្នាំមុន`; // "years ago"
    if (months > 0) return `${months} ខែមុន`; // "months ago"
    if (days > 0) return `${days} ថ្ងៃមុន`; // "days ago"
    if (hours > 0) return `${hours} ម៉ោងមុន`; // "hours ago"
    if (minutes > 0) return `${minutes} នាទីមុន`; // "minutes ago"
    return 'ឥឡូវនេះ'; // "Just now"
};

export default function TimeDifferenceComponent({ createdAt }: Props) {
    return (
        <p className="font-light text-gray-500 text-sm">
            {getTimeDifference(createdAt)}
        </p>
    );
}