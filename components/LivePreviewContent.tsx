// @ts-nocheck
import React from 'react';
import {TabPanel} from './AppBuilderVerticalTabContent';
import {useLivePreview} from './LivePreviewContext';
import {useProductInfo} from './ProductInfoContext';
import {useVerticalTab} from './VerticalTabContext';
import Videocall from './Videocall';
import VideocallMobile from './VideocallMobile';

export const LivePreviewSVG = ({
  backgroundLogoUrl,
  primaryLogoUrl,
  primary_font_color,
  landing_sub_heading,
  primary_color,
  product_name,
  isLivePreview,
}: {
  backgroundLogoUrl: File | null | string;
  primaryLogoUrl: File | null | string;
  primary_font_color: string;
  landing_sub_heading: string;
  primary_color: string;
  product_name: string;
  isLivePreview: boolean;
}) => {
  return (
    <div
      style={
        isLivePreview
          ? {
              display: 'grid',
              placeContent: 'center',
              margin: -50,
              zIndex: -1,
            }
          : {
              margin: -70,
            }
      }>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width={isLivePreview ? '1394' : ''}
        height={isLivePreview ? 'calc(100vh - 60px)' : ''}
        viewBox="0 0 1394 985">
        <defs>
          <filter
            id="Rectangle_288"
            x="0"
            y="0"
            width="1394"
            height="985"
            filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="43" result="blur" />
            <feFlood floodOpacity="0.161" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
          <pattern
            id={`${product_name}-1`}
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            viewBox="0 0 1136 730">
            <image width="1136" height="730" xlinkHref={backgroundLogoUrl} />
          </pattern>
          <pattern
            id={`${product_name}-2`}
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            viewBox="0 0 300 103">
            <image width="300" height="103" xlinkHref={primaryLogoUrl} />
          </pattern>
        </defs>
        <g
          id="Group_501"
          data-name="Group 501"
          transform="translate(66 86)"
          fill={backgroundLogoUrl === './transparent.png' ? '#fff' : ''}>
          <g
            transform="matrix(1, 0, 0, 1, -66, -86)"
            filter="url(#Rectangle_288)">
            <rect
              id="Rectangle_288-2"
              data-name="Rectangle 288"
              width="1136"
              height="727"
              rx="14"
              transform="translate(129 126)"
            />
          </g>
          <g id="Group_500" data-name="Group 500">
            <rect
              id="temp"
              width="1136"
              height="730"
              rx="10"
              transform="translate(63 40)"
              fill={`url(#${product_name}-1)`}
            />
            <rect
              id="Agora-new-logo-rgb"
              width="82"
              height="28"
              transform="translate(590 133)"
              fill={`url(#${product_name}-2)`}
            />
            <text
              id="Together_Business"
              data-name="Together Business"
              transform="translate(631 252)"
              dominantBaseline="middle"
              textAnchor="middle"
              fill={primary_font_color}
              fontSize="25"
              fontFamily="Roboto-Bold, Roboto"
              fontWeight="700">
              {product_name}
            </text>
            <text
              id="Where_business_happens_online_on_time_each_time."
              data-name="Where business happens online, on time, each time."
              transform="translate(631 288)"
              fill={primary_font_color}
              fontSize="17"
              fontFamily="Roboto-Medium, Roboto"
              fontWeight="500"
              dominantBaseline="middle"
              textAnchor="middle">
              {landing_sub_heading}
            </text>
            <g
              id="Group_494"
              data-name="Group 494"
              transform="translate(434 478.61)">
              <rect
                id="Rectangle_279"
                data-name="Rectangle 279"
                width="394"
                height="44"
                rx="22"
                transform="translate(0 0.39)"
                fill={primary_color}
              />
              <text
                id="Create_Meeting"
                data-name="Create Meeting"
                transform="translate(187 26.39)"
                fill="#fff"
                fontSize="14"
                fontFamily="Roboto-Medium, Roboto"
                fontWeight="500">
                <tspan x="-48.019" y="0">
                  Create Meeting
                </tspan>
              </text>
            </g>
            <g
              id="Group_493"
              data-name="Group 493"
              transform="translate(434 605.777)">
              <g
                id="Rectangle_280"
                fillOpacity="0"
                data-name="Rectangle 280"
                transform="translate(0 0.223)"
                stroke={primary_color}
                strokeWidth="1">
                <rect width="394" height="45" rx="22.5" stroke="none" />
                <rect
                  x="0.5"
                  y="0.5"
                  width="393"
                  height="44"
                  rx="22"
                  fill="none"
                />
              </g>
              <text
                id="Meeting_ID_or_URL"
                data-name="Meeting ID or URL"
                transform="translate(183 26.223)"
                fill={primary_color}
                fontSize="14"
                fontFamily="Roboto-Medium, Roboto"
                fontWeight="500">
                <tspan x="-56.561" y="0">
                  Meeting ID or URL
                </tspan>
              </text>
            </g>
            <g
              id="Group_492"
              data-name="Group 492"
              transform="translate(117 -39)">
              <text
                id="Use_PSTN_Join_by_dialing_a_number_"
                data-name="Use PSTN (Join by dialing a number)"
                transform="translate(407 489)"
                fill={primary_font_color}
                fontSize="13"
                fontFamily="Roboto-Regular, Roboto">
                <tspan x="0" y="0">
                  Use PSTN (Join by dialing a number)
                </tspan>
              </text>
              <g id="Group_491" data-name="Group 491">
                <text
                  id="Restrict_Host_Controls_Separate_host_link_"
                  data-name="Restrict Host Controls (Separate host link)"
                  transform="translate(407 458)"
                  fill={primary_font_color}
                  fontSize="13"
                  fontFamily="Roboto-Regular, Roboto">
                  <tspan x="0" y="0">
                    Restrict Host Controls (Separate host link)
                  </tspan>
                </text>
                <g
                  id="Rectangle_281"
                  fillOpacity="0"
                  data-name="Rectangle 281"
                  transform="translate(379 444)"
                  stroke="#b9b2b2"
                  strokeWidth="2">
                  <rect width="20" height="20" rx="6" stroke="none" />
                  <rect x="1" y="1" width="18" height="18" rx="5" fill="none" />
                </g>
              </g>
              <g
                id="Rectangle_284"
                fillOpacity="0"
                data-name="Rectangle 284"
                transform="translate(379 476)"
                stroke="#b9b2b2"
                strokeWidth="2">
                <rect width="20" height="19" rx="6" stroke="none" />
                <rect x="1" y="1" width="18" height="17" rx="5" fill="none" />
              </g>
            </g>
            <path
              id="Path_581"
              data-name="Path 581"
              d="M50.5,42.363c0-3.791,3.834-6.863,8.563-6.863H1177.937c4.727,0,8.563,3.073,8.563,6.863V63.971H50.5Z"
              transform="translate(12.5 4.5)"
              fill="#fff"
            />
            <circle
              id="Ellipse_16"
              data-name="Ellipse 16"
              cx="5.556"
              cy="5.556"
              r="5.556"
              transform="translate(73 50)"
              fill="#c4c4c4"
            />
            <circle
              id="Ellipse_17"
              data-name="Ellipse 17"
              cx="5.556"
              cy="5.556"
              r="5.556"
              transform="translate(89.667 50)"
              fill="#c4c4c4"
            />
            <circle
              id="Ellipse_18"
              data-name="Ellipse 18"
              cx="5.556"
              cy="5.556"
              r="5.556"
              transform="translate(106.333 50)"
              fill="#c4c4c4"
            />
            <g
              id="Group_495"
              data-name="Group 495"
              transform="translate(434 336.776)">
              <g
                id="Component_2_7"
                data-name="Component 2 – 7"
                transform="translate(0 0.224)">
                <g
                  id="Rectangle_278"
                  fillOpacity="0"
                  data-name="Rectangle 278"
                  transform="translate(0 0)"
                  fill="#fff"
                  stroke={primary_color}
                  strokeWidth="1">
                  <rect width="395" height="44" rx="22" stroke="none" />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="394"
                    height="43"
                    rx="21.5"
                    fill="none"
                  />
                </g>
              </g>
              <text
                id="AcmeMeeting"
                fill={primary_font_color}
                transform="translate(188 26.224)"
                fontSize="14"
                fontFamily="Roboto-Medium, Roboto"
                fontWeight="500">
                <tspan x="-43.788" y="0">
                  acme meeting
                </tspan>
              </text>
            </g>
            <line
              id="Line_79"
              data-name="Line 79"
              x2="210"
              transform="translate(526.5 564.5)"
              fill="none"
              stroke={primary_color}
              strokeWidth="1"
              opacity="0.499"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};
export const getImageUrl = (image: File | null | string) => {
  // create a url object for a file type
  if (image && typeof image !== 'string') {
    return URL.createObjectURL(image);
  }

  if (image === '' || image === null) {
    return './transparent.png';
  }

  // the case when the provided image is a link string
  return image;
};

const LivePreviewContentDesktop = () => {
  const {selectedTabValue} = useVerticalTab();
  const {livePreviewDisplayType} = useLivePreview();

  const {productInfo} = useProductInfo();

  const backgroundLogoUrl = getImageUrl(productInfo.primary_background_logo);
  const primaryLogoUrl = getImageUrl(productInfo.primary_logo);
  return (
    <TabPanel value={livePreviewDisplayType} index={0}>
      {[1, 3, 4, 6].map((e) => (
        <TabPanel padding={0} value={selectedTabValue} index={e} key={e}>
          <LivePreviewSVG
            backgroundLogoUrl={backgroundLogoUrl}
            primaryLogoUrl={primaryLogoUrl}
            primary_font_color={productInfo.primary_font_color}
            landing_sub_heading={productInfo.landing_sub_heading}
            primary_color={productInfo.primary_color}
            product_name={productInfo.product_name}
            isLivePreview={true}
          />
        </TabPanel>
      ))}

      {[7].map((e) => (
        <TabPanel padding={0} value={selectedTabValue} index={e} key={e}>
          <div
            style={{
              border: '8px solid #FFFFFF',
              boxShadow: ' 0px 15px 40px rgba(0, 0, 0, 0.100333)',
              borderRadius: '10px',
              margin: '50px auto',
              width: 'fit-content',
            }}>
            <Videocall
              primaryColor={productInfo.primary_color}
              primaryFontColor={productInfo.primary_font_color}
              secondaryFontColor={productInfo.secondary_font_color}
              bg={productInfo.primary_background_logo}
              defaultbg="./transparent.png"
            />
          </div>
        </TabPanel>
      ))}
    </TabPanel>
  );
};

const LivePreviewContentMobile = () => {
  const {selectedTabValue} = useVerticalTab();
  const {livePreviewDisplayType} = useLivePreview();

  const {productInfo} = useProductInfo();

  const backgroundLogoUrl = getImageUrl(productInfo.primary_background_logo);
  const primaryLogoUrl = getImageUrl(productInfo.primary_logo);

  return (
    <TabPanel value={livePreviewDisplayType} index={1}>
      {[1, 3, 4, 6].map((e) => (
        <TabPanel padding={0} value={selectedTabValue} index={e} key={e}>
          <div
            style={{
              display: 'grid',
              placeContent: 'center',
              marginTop: -40,
              zIndex: -1,
            }}>
            <svg
              style="z-index: -1;"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="629"
              height="calc(100vh - 60px)"
              viewBox="0 0 629 950">
              <defs>
                <filter
                  id="Rectangle_287"
                  x="10.684"
                  y="-11.642"
                  width="602"
                  height="927"
                  filterUnits="userSpaceOnUse">
                  <feOffset input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="49.5" result="blur" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <clipPath id="clip-path">
                  <path
                    id="Path_588"
                    data-name="Path 588"
                    d="M134.632,40a1.488,1.488,0,0,1,1.473,1.278h0a37.2,37.2,0,0,0,36.826,31.939H269.74a37.2,37.2,0,0,0,36.826-31.939h0A1.488,1.488,0,0,1,308.039,40h36.671a37.961,37.961,0,0,1,37.961,37.961v597.89a37.962,37.962,0,0,1-37.961,37.961H97.961A37.961,37.961,0,0,1,60,675.851V77.961A37.961,37.961,0,0,1,97.961,40Z"
                    transform="translate(-1.02 -0.765)"
                    fill="#fff"
                    stroke="#707070"
                    strokeWidth="0.2"
                  />
                </clipPath>
                <pattern
                  id="pattern"
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                  viewBox="0 0 1136 730">
                  <image
                    width="1136"
                    height="730"
                    xlinkHref={backgroundLogoUrl}
                  />
                </pattern>
                <pattern
                  id="pattern-2"
                  preserveAspectRatio="none"
                  width="100%"
                  height="100%"
                  viewBox="0 0 300 103">
                  <image width="300" height="103" xlinkHref={primaryLogoUrl} />
                </pattern>
                <clipPath id="clip-SVG_4">
                  <rect width="629" height="950" />
                </clipPath>
              </defs>
              <g id="SVG_4" data-name="SVG – 4" clip-path="url(#clip-SVG_4)">
                <rect width="629" height="950" fill="#fff" />
                <g
                  id="Group_498"
                  data-name="Group 498"
                  transform="translate(-253.816 69.858)">
                  <g
                    transform="matrix(1, 0, 0, 1, 253.82, -69.86)"
                    filter="url(#Rectangle_287)">
                    <rect
                      id="Rectangle_287-2"
                      data-name="Rectangle 287"
                      width="305"
                      height="630"
                      rx="36"
                      transform="translate(159.18 136.86)"
                      fill="#fff"
                    />
                  </g>
                  <g id="Group_497" data-name="Group 497">
                    <g
                      id="iPhone_Front"
                      data-name="iPhone Front"
                      transform="translate(348 -11)">
                      <path
                        id="Path_582"
                        data-name="Path 582"
                        d="M92.452,25A47.452,47.452,0,0,0,45,72.452v607.38a47.452,47.452,0,0,0,47.452,47.452H348.69a47.452,47.452,0,0,0,47.452-47.452V72.452A47.452,47.452,0,0,0,348.69,25Zm0,5.694A41.757,41.757,0,0,0,50.694,72.452v607.38a41.757,41.757,0,0,0,41.757,41.757H348.69a41.757,41.757,0,0,0,41.757-41.757V72.452A41.757,41.757,0,0,0,348.69,30.694Z"
                        transform="translate(-0.255)"
                        fill="#fff"
                        stroke="#707070"
                        strokeWidth="0.1"
                        fill-rule="evenodd"
                      />
                      <path
                        id="Path_583"
                        data-name="Path 583"
                        d="M40,116.9a1.9,1.9,0,0,1,1.9-1.9h1.9v23.726H41.9a1.9,1.9,0,0,1-1.9-1.9Z"
                        transform="translate(0 -4.587)"
                        fill="#fff"
                        stroke="#707070"
                        strokeWidth="0.1"
                      />
                      <path
                        id="Path_584"
                        data-name="Path 584"
                        d="M40,166.9a1.9,1.9,0,0,1,1.9-1.9h1.9v43.655H41.9a1.9,1.9,0,0,1-1.9-1.9Z"
                        transform="translate(0 -7.136)"
                        fill="#fff"
                        stroke="#707070"
                        strokeWidth="0.1"
                        fill-rule="evenodd"
                      />
                      <path
                        id="Path_585"
                        data-name="Path 585"
                        d="M40,226.9a1.9,1.9,0,0,1,1.9-1.9h1.9v43.655H41.9a1.9,1.9,0,0,1-1.9-1.9Z"
                        transform="translate(0 -10.194)"
                        fill="#fff"
                        stroke="#707070"
                        strokeWidth="0.1"
                      />
                      <path
                        id="Path_586"
                        data-name="Path 586"
                        d="M419.8,182.9a1.9,1.9,0,0,0-1.9-1.9H416v72.126h1.9a1.9,1.9,0,0,0,1.9-1.9Z"
                        transform="translate(-19.164 -7.951)"
                        fill="#fff"
                        stroke="#707070"
                        strokeWidth="0.1"
                        fill-rule="evenodd"
                      />
                      <circle
                        id="Ellipse_19"
                        data-name="Ellipse 19"
                        cx="4.5"
                        cy="4.5"
                        r="4.5"
                        transform="translate(188.632 48.283)"
                        fill="#e3e3e3"
                      />
                      <circle
                        id="Ellipse_20"
                        data-name="Ellipse 20"
                        cx="3.559"
                        cy="3.559"
                        r="3.559"
                        transform="translate(189.71 49.438)"
                        fill="#fff"
                        stroke="#707070"
                        strokeWidth="0.1"
                      />
                      <path
                        id="Path_587"
                        data-name="Path 587"
                        d="M220,54.847A2.847,2.847,0,0,1,222.847,52h32.267a2.847,2.847,0,0,1,2.847,2.847h0a2.847,2.847,0,0,1-2.847,2.847H222.847A2.847,2.847,0,0,1,220,54.847Z"
                        transform="translate(-9.174 -1.376)"
                        fill="#fff"
                        stroke="#707070"
                        strokeWidth="0.1"
                        fill-rule="evenodd"
                      />
                      <g
                        id="Mask_Group_1"
                        data-name="Mask Group 1"
                        clip-path="url(#clip-path)">
                        <g
                          id="temp"
                          transform="translate(-354.368 11.142)"
                          stroke="#707070"
                          strokeWidth="0.2"
                          fill="url(#pattern)">
                          <rect
                            width="1136"
                            height="730"
                            rx="10"
                            stroke="none"
                          />
                          <rect
                            x="0.1"
                            y="0.1"
                            width="1135.8"
                            height="729.8"
                            rx="9.9"
                            fill="none"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_499"
                    data-name="Group 499"
                    transform="translate(-6)">
                    <rect
                      id="Agora-new-logo-rgb"
                      width="62"
                      height="21"
                      transform="translate(544 167)"
                      fill="url(#pattern-2)"
                    />
                    <text
                      id="Together_Business"
                      data-name="Together Business"
                      transform="translate(570 255)"
                      fill={productInfo.primary_font_color}
                      fontSize="23"
                      fontFamily="Roboto-Bold, Roboto"
                      fontWeight="700"
                      dominantBaseline="middle"
                      textAnchor="middle">
                      ${productInfo.product_name}
                    </text>
                    <foreignObject
                      width="280"
                      height="200"
                      style="transform: translate(433px, 254px)"
                      requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility">
                      <p
                        style={`text-align: center;font-size: 14px;line-height: 14px; margin-top:17px; color: ${productInfo.primary_font_color}`}
                        xmlns="http://www.w3.org/1999/xhtml">
                        {productInfo.landing_sub_heading}
                      </p>
                    </foreignObject>
                    <g
                      id="Group_494"
                      data-name="Group 494"
                      transform="translate(430.686 432)">
                      <rect
                        id="Rectangle_279"
                        data-name="Rectangle 279"
                        width="287"
                        height="35"
                        rx="17.5"
                        transform="translate(0.314 0)"
                        fill={productInfo.primary_color}
                      />
                      <text
                        id="Create_Meeting"
                        data-name="Create Meeting"
                        transform="translate(141.314 22)"
                        fill="#fff"
                        fontSize="12"
                        fontFamily="Roboto-Medium, Roboto"
                        fontWeight="500">
                        <tspan x="-41.159" y="0">
                          Create Meeting
                        </tspan>
                      </text>
                    </g>
                    <g
                      id="Group_493"
                      data-name="Group 493"
                      transform="translate(430.686 527)">
                      <g
                        id="Rectangle_280"
                        fillOpacity="0"
                        data-name="Rectangle 280"
                        transform="translate(0.314 0)"
                        stroke={productInfo.primary_color}
                        strokeWidth="0.5">
                        <rect width="287" height="35" rx="17.5" stroke="none" />
                        <rect
                          x="0.25"
                          y="0.25"
                          width="286.5"
                          height="34.5"
                          rx="17.25"
                          fill="none"
                        />
                      </g>
                      <text
                        id="Meeting_ID_or_URL"
                        data-name="Meeting ID or URL"
                        transform="translate(138.314 22)"
                        fill={productInfo.primary_color}
                        fontSize="12"
                        fontFamily="Roboto-Medium, Roboto"
                        fontWeight="500">
                        <tspan x="-48.48" y="0">
                          Meeting ID or URL
                        </tspan>
                      </text>
                    </g>
                    <g
                      id="Group_492"
                      data-name="Group 492"
                      transform="translate(479.538 373)">
                      <text
                        id="Use_PSTN_Join_by_dialing_a_number_"
                        data-name="Use PSTN (Join by dialing a number)"
                        transform="translate(21.462 33)"
                        fill={productInfo.primary_font_color}
                        fontSize="9"
                        fontFamily="Roboto-Regular, Roboto">
                        <tspan x="0" y="0">
                          Use PSTN (Join by dialing a number)
                        </tspan>
                      </text>
                      <g
                        id="Group_491"
                        data-name="Group 491"
                        transform="translate(0)">
                        <text
                          id="Restrict_Host_Controls_Separate_host_link_"
                          data-name="Restrict Host Controls (Separate host link)"
                          transform="translate(21.462 9)"
                          fill={productInfo.primary_font_color}
                          fontSize="9"
                          fontFamily="Roboto-Regular, Roboto">
                          <tspan x="0" y="0">
                            Restrict Host Controls (Separate host link)
                          </tspan>
                        </text>
                        <g
                          id="Rectangle_281"
                          fillOpacity="0"
                          data-name="Rectangle 281"
                          transform="translate(0.462 -2)"
                          stroke="#b9b2b2"
                          strokeWidth="1">
                          <rect width="15" height="15" rx="6" stroke="none" />
                          <rect
                            x="0.5"
                            y="0.5"
                            width="14"
                            height="14"
                            rx="5.5"
                            fill="none"
                          />
                        </g>
                      </g>
                      <g
                        id="Rectangle_284"
                        fillOpacity="0"
                        data-name="Rectangle 284"
                        transform="translate(0.462 22)"
                        stroke="#b9b2b2"
                        strokeWidth="1">
                        <rect width="15" height="15" rx="6" stroke="none" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="14"
                          height="14"
                          rx="5.5"
                          fill="none"
                        />
                      </g>
                    </g>
                    <g
                      id="Group_495"
                      data-name="Group 495"
                      transform="translate(430.686 318)">
                      <g
                        id="Component_2_5"
                        fillOpacity="0"
                        data-name="Component 2 – 5"
                        transform="translate(0.314 0)">
                        <g
                          id="Rectangle_278"
                          data-name="Rectangle 278"
                          transform="translate(0 0)"
                          stroke={productInfo.primary_color}
                          strokeWidth="0.5">
                          <rect width="288" height="36" rx="18" stroke="none" />
                          <rect
                            x="0.25"
                            y="0.25"
                            width="287.5"
                            height="35.5"
                            rx="17.75"
                            fill="none"
                          />
                        </g>
                      </g>
                      <text
                        id="Create_Meeting"
                        data-name="Create Meeting"
                        transform="translate(141.314 20)"
                        fill={productInfo.primary_font_color}
                        fontSize="12"
                        fontFamily="Roboto-Medium, Roboto"
                        fontWeight="500"
                        dominantBaseline="middle"
                        textAnchor="middle">
                        ACME Meeting
                      </text>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </TabPanel>
      ))}

      {[7].map((e) => (
        <TabPanel padding={0} value={selectedTabValue} index={e} key={e}>
          <div
            style={{
              display: 'grid',
              placeContent: 'center',
              margin: -40,
            }}>
            <VideocallMobile
              bg={productInfo.primary_background_logo}
              defaultbg="./transparent.png"
              primaryColor={productInfo.primary_color}
              primaryFontColor={productInfo.primary_font_color}
              secondaryFontColor={productInfo.secondary_font_color}
            />
          </div>
        </TabPanel>
      ))}
    </TabPanel>
  );
};

const LivePreviewContent = () => {
  return (
    <>
      <LivePreviewContentDesktop />
      <LivePreviewContentMobile />
    </>
  );
};

export default LivePreviewContent;
