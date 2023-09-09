import createIconComponent from './utils/createIconComponent'

const ExternalLinkIcon = createIconComponent({
  content: (
    <path d="M384 320C366.326 320 352 334.328 352 352V448H64V160.004H160C177.674 160.004 192 145.68 192 128.004S177.674 96.004 160 96.004H64C28.654 96.004 0 124.656 0 160.004V448C0 483.344 28.654 512 64 512H352C387.346 512 416 483.344 416 448V352C416 334.328 401.674 320 384 320ZM502.629 9.367C496.84 3.578 488.844 0 480 0H320C302.328 0 288.004 14.324 288.004 31.996C288.004 49.664 302.328 63.992 319.998 63.992H402.75L178.742 290.738C166.244 303.234 166.244 323.5 178.742 336C191.24 348.496 211.502 348.492 224 336L448.008 109.246V192C448.008 209.672 462.334 223.996 480.004 223.996H480.006C497.676 223.996 512 209.672 512 192V31.996C512 23.156 508.422 15.156 502.629 9.367Z" />
  ),
  viewBox: '0 0 512 512'
})

export default ExternalLinkIcon
