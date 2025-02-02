import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/lsk8rgz.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}