import { useState } from "react";
import { Box } from "@mui/material";
import type { StateType } from "../mocks/regions";
import { brazilianMap } from "../mocks/regions";

interface BrazilianMapProps {
  setSelectedState: (state: StateType | null) => void;
}

const BrazilianMap = ({ setSelectedState }: BrazilianMapProps) => {
  const [clickedId, setClickedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const clickedState = brazilianMap.find((state) => state.id === clickedId);
  const hoveredState = brazilianMap.find((state) => state.id === hoveredId);
  const otherStates = brazilianMap.filter(
    (state) => state.id !== clickedId && state.id !== hoveredId,
  );

  const regions = [
    { name: "Norte", x: 20, y: 120 },
    { name: "Nordeste", x: 535, y: 80 },
    { name: "Centro-Oeste", x: 175, y: 370 },
    { name: "Sudeste", x: 555, y: 465 },
    { name: "Sul", x: 425, y: 575 },
  ];

  const handleStateClick = (state: StateType) => {
    if (clickedId === state.id) {
      setClickedId(null);
      setSelectedState?.(null);
      return;
    }
    setClickedId(state.id);
    if (setSelectedState) {
      setSelectedState(state);
    }
  };

  const handleStateHover = (stateId: string | null) => {
    setHoveredId(stateId);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 300,
        m: 1,
      }}
    >
      <Box
        component="svg"
        width="100%"
        height="auto"
        viewBox="0 0 620 640"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <filter
            id="hover-shadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#4a90e2"
              floodOpacity="0.5"
            />
          </filter>
        </defs>

        {otherStates.map((state) => (
          <g key={state.id}>
            <Box
              component="path"
              d={state.d}
              fill={"transparent"}
              stroke={"#4a90e2"}
              strokeWidth={1}
              onClick={() => handleStateClick(state)}
              onMouseEnter={() => handleStateHover(state.id)}
              onMouseLeave={() => handleStateHover(null)}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s",
                transform: "none",
              }}
              zIndex={0}
            />
            {state.cx !== undefined && state.cy !== undefined && (
              <Box
                component="text"
                x={state.cx}
                y={state.cy}
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize={8.8}
                fontWeight="bold"
                fill={"#4a90e2"}
                pointerEvents="none"
              >
                {state.id.replace("BR-", "")}
              </Box>
            )}
          </g>
        ))}

        {hoveredState && hoveredId !== clickedId && (
          <g key={hoveredState.id}>
            <Box
              component="path"
              d={hoveredState.d}
              fill={"#e2245df6"}
              fillOpacity={0.12}
              stroke={"#4a90e2"}
              strokeOpacity={0.8}
              strokeWidth={1}
              onClick={() => handleStateClick(hoveredState)}
              onMouseEnter={() => handleStateHover(hoveredState.id)}
              onMouseLeave={() => handleStateHover(null)}
              style={{
                cursor: "pointer",
                transition: "transform 0.2s",
                transform: "scale(1.002)",
              }}
              zIndex={1}
            />
            {hoveredState.cx !== undefined && hoveredState.cy !== undefined && (
              <Box
                component="text"
                x={hoveredState.cx}
                y={hoveredState.cy}
                textAnchor="middle"
                alignmentBaseline="central"
                fontSize={9.2}
                fontWeight="bold"
                fill={"#e2245df6"}
                pointerEvents="none"
              >
                {hoveredState.id.replace("BR-", "")}
              </Box>
            )}
          </g>
        )}

        {clickedState && (
          <g key={clickedState.id}>
            {(() => {
              const isClicked = clickedId === clickedState.id;
              const isHovered = hoveredId === clickedState.id && !isClicked;
              return (
                <>
                  <Box
                    component="path"
                    d={clickedState.d}
                    fill={
                      isClicked
                        ? "#4a90e2"
                        : isHovered
                          ? "#e2245df6"
                          : "transparent"
                    }
                    fillOpacity={isHovered ? 0.12 : undefined}
                    stroke={isClicked ? "#4a90e2" : undefined}
                    strokeWidth={isClicked ? 2 : 1}
                    strokeOpacity={isHovered ? 0.8 : undefined}
                    filter={isClicked ? "url(#hover-shadow)" : undefined}
                    onClick={() => handleStateClick(clickedState)}
                    onMouseEnter={() => handleStateHover(clickedState.id)}
                    onMouseLeave={() => handleStateHover(null)}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      transform: isClicked
                        ? "scale(1.0002)"
                        : isHovered
                          ? "scale(1.002)"
                          : "none",
                    }}
                    zIndex={isClicked ? 1 : 0}
                  />
                  {clickedState.cx !== undefined &&
                    clickedState.cy !== undefined && (
                      <Box
                        component="text"
                        x={clickedState.cx}
                        y={clickedState.cy}
                        textAnchor="middle"
                        alignmentBaseline="central"
                        style={{
                          transform: isClicked
                            ? "scale(1.003)"
                            : isHovered
                              ? "scale(1.002)"
                              : "none",
                        }}
                        fontSize={isClicked ? 10 : isHovered ? 9.2 : 8.8}
                        fontWeight="bold"
                        fill={
                          isClicked
                            ? "#fff"
                            : isHovered
                              ? "#e2245df6"
                              : "#4a90e2"
                        }
                        pointerEvents="none"
                      >
                        {clickedState.id.replace("BR-", "")}
                      </Box>
                    )}
                  {isClicked &&
                    regions.map(
                      (region) =>
                        region.name === clickedState.region && (
                          <Box
                            component="text"
                            key={region.name}
                            x={region.x}
                            y={region.y}
                            textAnchor="middle"
                            alignmentBaseline="central"
                            fill="#e2245df6"
                            fontWeight={"bold"}
                            fontSize={"14px"}
                          >
                            {region.name}
                          </Box>
                        ),
                    )}
                </>
              );
            })()}
          </g>
        )}
      </Box>
    </Box>
  );
};

export default BrazilianMap;
