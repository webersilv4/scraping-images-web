export const metadata = {
    title: 'Scraping de Fotos',
    description: 'Scraping de fotos da web',
};

export default function RootLayout({
    children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
