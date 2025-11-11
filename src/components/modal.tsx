import type { JSX, ReactNode } from "react";
import type { ButtonProps, ModalOverlayProps } from "react-aria-components";
import { css } from "panda/css";
import {
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  Button,
  Dialog,
  Heading,
} from "react-aria-components";

const overlayStyles = css({
  position: "fixed",
  inset: 0,
  zIndex: "modal",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // TODO: トークンに置き換え
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "fadeIn 200ms",
});

const modalStyles = css({
  backgroundColor: "white", // TODO: トークンに置き換え
  borderRadius: "lg",
  boxShadow: "2xl",
  outline: "none",
  maxWidth: "600px",
  width: "90vw",
  maxHeight: "85vh",
  overflow: "auto",
  animation: "slideUp 300ms",
});

const dialogStyles = css({
  padding: "48",
  outline: "none",
});

const headerStyles = css({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "4",
});

const titleStyles = css({
  fontSize: "2xl",
  fontWeight: "bold",
  margin: 0,
});

const closeButtonStyles = css({
  padding: "2",
  borderRadius: "md",
  cursor: "pointer",
  transition: "background 200ms",
  border: "none",
  backgroundColor: "transparent", // TODO: トークンに置き換え
  fontSize: "lg",
  lineHeight: 1,
  color: "gray.600", // TODO: トークンに置き換え
  _hover: {
    backgroundColor: "gray.100", // TODO: トークンに置き換え
  },
});

const contentStyles = css({
  marginBottom: "8",
});

const footerStyles = css({
  display: "flex",
  justifyContent: "center",
  gap: "100",
  marginTop: "6",
});

const primaryButtonStyles = css({
  padding: "2 4",
  borderRadius: "md",
  fontWeight: "semibold",
  cursor: "pointer",
  transition: "all 200ms",
  border: "none",
  fontSize: "sm",
  backgroundColor: "blue.600", // TODO: トークンに置き換え
  color: "white", // TODO: トークンに置き換え
  _hover: {
    backgroundColor: "blue.700", // TODO: トークンに置き換え
  },
});

const secondaryButtonStyles = css({
  padding: "2 4",
  borderRadius: "md",
  fontWeight: "semibold",
  cursor: "pointer",
  transition: "all 200ms",
  border: "none",
  fontSize: "sm",
  backgroundColor: "gray.200", // TODO: トークンに置き換え
  color: "gray.800", // TODO: トークンに置き換え
  _hover: {
    backgroundColor: "gray.300", // TODO: トークンに置き換え
  },
});

// アニメーション定義をpanda.config.tsに追加する必要があります
// keyframes: {
//   fadeIn: {
//     from: { opacity: 0 },
//     to: { opacity: 1 }
//   },
//   slideUp: {
//     from: { transform: 'translateY(20px)', opacity: 0 },
//     to: { transform: 'translateY(0)', opacity: 1 }
//   }
// }

type ModalProps = {
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
} & ModalOverlayProps;

export function Modal({ children, title, showCloseButton = true, ...props }: ModalProps): JSX.Element {
  return (
    <AriaModalOverlay {...props} className={overlayStyles}>
      <AriaModal className={modalStyles}>
        <Dialog className={dialogStyles}>
          {({ close }): JSX.Element => (
            <>
              {((title != null && title !== "") || showCloseButton) && (
                <div className={headerStyles}>
                  {(title != null && title !== "") && (
                    <Heading className={titleStyles} slot="title">
                      {title}
                    </Heading>
                  )}
                  {showCloseButton && (
                    <Button aria-label="閉じる" className={closeButtonStyles} onPress={close}>
                      ✕
                    </Button>
                  )}
                </div>
              )}
              <div className={contentStyles}>{children}</div>
            </>
          )}
        </Dialog>
      </AriaModal>
    </AriaModalOverlay>
  );
}

type ModalFooterProps = {
  children: ReactNode;
};

export function ModalFooter({ children }: ModalFooterProps): JSX.Element {
  return <div className={footerStyles}>{children}</div>;
}

type ModalButtonProps = {
  variant?: "primary" | "secondary";
} & ButtonProps;

export function ModalButton({ variant = "secondary", className, ...props }: ModalButtonProps): JSX.Element {
  const buttonClass = variant === "primary" ? primaryButtonStyles : secondaryButtonStyles;
  return <Button {...props} className={className ?? buttonClass} />;
}

// 使いやすさのためのエクスポート
export { Modal as default };
