import { ImageResponse } from "next/og";

const size = {
  width: 1200,
  height: 630
};

export const runtime = "edge";

export const GET = async (req: Request) => {
  const inter = fetch(new URL("./inter.ttf", import.meta.url)).then((res) => res.arrayBuffer());
  const familjen = fetch(new URL("./heading-bold.ttf", import.meta.url)).then((res) => res.arrayBuffer());
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const author = searchParams.get("author");

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#070c17",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #211539 0%, transparent 50%), radial-gradient(circle at 75% 75%, #211539 0%, transparent 50%)"
        }}
      >
        {/* Background lines */}

        {/* Top bar with logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "40px 60px",
            zIndex: 1
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Familjen"
            }}
          >
            <span
              style={{
                marginLeft: 16,
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
                fontFamily: "Familjen"
              }}
            >
              SXM Quiz
            </span>
          </div>
        </div>

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flex: 1,
            padding: "0 60px",
            zIndex: 1
          }}
        >
          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: "bold",
              letterSpacing: "-0.05em",
              fontFamily: "Familjen",
              color: "white",
              lineHeight: 1.2,
              textAlign: "center",
              maxWidth: "80%",
              textWrap: "balance"
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: "40px 60px",
            zIndex: 1
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              color: "white"
            }}
          >
            <span style={{ fontSize: 24 }}>{author}</span>
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await inter,
          style: "normal",
          weight: 400
        },
        {
          name: "Familjen",
          data: await familjen,
          style: "normal",
          weight: 600
        }
      ]
    }
  );
};
