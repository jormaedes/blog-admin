interface PostContentProps {
  content: string;
}

export default function PostContent({ content }: PostContentProps) {
  return (
    <article
      className="
        prose
        prose-gray
        max-w-none
        wrap-break-word

        prose-headings:font-serif
        prose-headings:text-gray-900

        prose-h1:mt-0
        prose-h1:mb-6
        prose-h1:text-3xl
        prose-h1:leading-tight
        sm:prose-h1:text-4xl

        prose-h2:mt-10
        prose-h2:mb-4
        prose-h2:text-2xl
        prose-h2:leading-tight

        prose-h3:mt-8
        prose-h3:mb-3
        prose-h3:text-xl
        prose-h3:leading-tight

        prose-p:my-5
        prose-p:leading-7
        prose-p:text-gray-700

        prose-a:font-medium
        prose-a:text-[#a5452e]
        prose-a:no-underline
        prose-a:hover:underline

        prose-strong:font-semibold
        prose-strong:text-gray-900

        prose-blockquote:border-l-[#c2573a]
        prose-blockquote:text-gray-600

        prose-ul:my-6
        prose-ol:my-6
        prose-li:my-1

        prose-img:my-8
        prose-img:h-auto
        prose-img:max-w-full
        prose-img:rounded-md

        prose-hr:my-10
        prose-hr:border-gray-200

        prose-code:rounded
        prose-code:bg-gray-100
        prose-code:px-1.5
        prose-code:py-0.5
        prose-code:text-sm
        prose-code:font-medium
        prose-code:text-gray-800
        prose-code:before:content-none
        prose-code:after:content-none

        prose-pre:my-8
        prose-pre:max-w-full
        prose-pre:overflow-x-auto
        prose-pre:rounded-md
        prose-pre:bg-gray-950

        prose-table:my-8
        prose-th:border
        prose-th:border-gray-200
        prose-th:bg-gray-50
        prose-th:px-4
        prose-th:py-3
        prose-td:border
        prose-td:border-gray-200
        prose-td:px-4
        prose-td:py-3

        dark:prose-invert

        dark:prose-a:text-[#df8064]
        dark:prose-hr:border-gray-800

        dark:prose-code:bg-gray-800
        dark:prose-code:text-gray-200

        dark:prose-th:border-gray-700
        dark:prose-th:bg-gray-800
        dark:prose-td:border-gray-700
        dark:prose-blockquote:border-l-[#df8064]
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}