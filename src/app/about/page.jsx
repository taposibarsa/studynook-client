export const metadata = {
  title: "StudyNook – About",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-6">About StudyNook</h1>
      <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed mb-4">
        StudyNook helps students and library users discover, list, and book private study
        rooms. Whether you need a quiet zone for exam prep or a group space with a
        whiteboard, StudyNook makes reserving the right room simple and reliable.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
        Room owners can earn by listing their spaces, while bookers enjoy transparent
        hourly pricing and automatic conflict prevention so every reservation is honored.
      </p>
    </div>
  );
}
